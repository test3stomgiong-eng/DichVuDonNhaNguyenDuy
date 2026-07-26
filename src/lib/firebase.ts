import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  CompanyConfig,
  LeadBooking,
  ServiceItem,
  PricePackage,
  BeforeAfterCase,
  CustomerReview,
  FaqItem,
} from '../types';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Collection Names
const COLS = {
  CONFIG: 'company_config',
  LEADS: 'leads',
  SERVICES: 'services',
  PACKAGES: 'packages',
  CASES: 'cases',
  REVIEWS: 'reviews',
  FAQS: 'faqs',
};

// 1. Company Config Helpers
export const subscribeCompanyConfig = (
  callback: (config: CompanyConfig | null) => void
) => {
  const docRef = doc(db, COLS.CONFIG, 'main');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as CompanyConfig);
      } else {
        callback(null);
      }
    },
    (error) => {
      console.warn('Firestore config listener error:', error);
      callback(null);
    }
  );
};

export const saveCompanyConfigToFirestore = async (config: CompanyConfig) => {
  const docRef = doc(db, COLS.CONFIG, 'main');
  await setDoc(docRef, config, { merge: true });
};

// 2. Leads Helpers
export const subscribeLeads = (callback: (leads: LeadBooking[]) => void) => {
  const colRef = collection(db, COLS.LEADS);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const leads: LeadBooking[] = [];
      snapshot.forEach((d) => {
        leads.push({ id: d.id, ...d.data() } as LeadBooking);
      });
      // Sort by createdAt descending
      leads.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      callback(leads);
    },
    (error) => {
      console.warn('Firestore leads listener error:', error);
    }
  );
};

export const addLeadToFirestore = async (
  lead: Omit<LeadBooking, 'id' | 'status' | 'createdAt'>
): Promise<LeadBooking> => {
  const id = 'lead-' + Date.now();
  const newLead: LeadBooking = {
    ...lead,
    id,
    status: 'new',
    createdAt: new Date().toLocaleString('vi-VN'),
  };
  const docRef = doc(db, COLS.LEADS, id);
  await setDoc(docRef, newLead);
  return newLead;
};

export const updateLeadStatusInFirestore = async (
  id: string,
  status: LeadBooking['status']
) => {
  const docRef = doc(db, COLS.LEADS, id);
  await setDoc(docRef, { status }, { merge: true });
};

export const deleteLeadFromFirestore = async (id: string) => {
  const docRef = doc(db, COLS.LEADS, id);
  await deleteDoc(docRef);
};

export const clearAllLeadsInFirestore = async (currentLeads: LeadBooking[]) => {
  for (const l of currentLeads) {
    await deleteDoc(doc(db, COLS.LEADS, l.id));
  }
};

// 3. Generic Array Sync Helpers (Services, Packages, Cases, Reviews, FAQs)
export const subscribeCollection = <T extends { id: string }>(
  colName: string,
  callback: (data: T[] | null) => void
) => {
  const colRef = collection(db, colName);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(null);
      } else {
        const items: T[] = [];
        snapshot.forEach((d) => {
          items.push({ ...d.data(), id: d.id } as T);
        });
        callback(items);
      }
    },
    (error) => {
      console.warn(`Firestore ${colName} listener error:`, error);
      callback(null);
    }
  );
};

export const saveCollectionToFirestore = async <T extends { id: string }>(
  colName: string,
  items: T[]
) => {
  // First get current items to delete removed ones
  const colRef = collection(db, colName);
  const snapshot = await getDocs(colRef);
  const currentIds = new Set(items.map((i) => i.id));

  for (const d of snapshot.docs) {
    if (!currentIds.has(d.id)) {
      await deleteDoc(doc(db, colName, d.id));
    }
  }

  // Write new / updated items
  for (const item of items) {
    await setDoc(doc(db, colName, item.id), item, { merge: true });
  }
};

import {
  defaultConfig,
  servicesList,
  pricePackages,
  beforeAfterCases,
  customerReviews,
  faqsList,
} from '../data/initialData';

// Seed initial data if Firestore database is empty
export const seedDefaultDataToFirestore = async () => {
  try {
    const configRef = doc(db, COLS.CONFIG, 'main');
    const snap = await getDoc(configRef);
    if (!snap.exists()) {
      console.log('Initializing empty Firestore with default collections...');
      await saveCompanyConfigToFirestore(defaultConfig);
      await saveCollectionToFirestore('services', servicesList);
      await saveCollectionToFirestore('packages', pricePackages);
      await saveCollectionToFirestore('cases', beforeAfterCases);
      await saveCollectionToFirestore('reviews', customerReviews);
      await saveCollectionToFirestore('faqs', faqsList);
      
      // Add a sample lead
      await addLeadToFirestore({
        fullName: 'Nguyễn Văn Anh (Khách mẫu)',
        phone: '0901234567',
        address: '123 Nguyễn Văn Cừ, Q.5, TP.HCM',
        serviceType: 'Dọn Dẹp Nhà Theo Giờ',
        preferredDate: '2026-08-01',
        preferredTime: '08:00',
        estimatedPrice: 240000,
        note: 'Đơn hàng tự động khởi tạo khi kết nối Firestore',
      });
      console.log('Successfully seeded initial Firestore collections!');
    }
  } catch (err) {
    console.warn('Error seeding default data to Firestore:', err);
  }
};
