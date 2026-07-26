import React, { useState, useEffect } from 'react';
import {
  defaultConfig,
  servicesList,
  pricePackages,
  beforeAfterCases,
  customerReviews,
  faqsList,
} from './data/initialData';
import {
  CompanyConfig,
  LeadBooking,
  ServiceItem,
  PricePackage,
  BeforeAfterCase,
  CustomerReview,
  FaqItem,
} from './types';
import {
  subscribeCompanyConfig,
  saveCompanyConfigToFirestore,
  subscribeLeads,
  addLeadToFirestore,
  updateLeadStatusInFirestore,
  deleteLeadFromFirestore,
  clearAllLeadsInFirestore,
  subscribeCollection,
  saveCollectionToFirestore,
  seedDefaultDataToFirestore,
} from './lib/firebase';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuickCalculator } from './components/QuickCalculator';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingContacts } from './components/FloatingContacts';
import { BookingFormModal } from './components/BookingFormModal';
import { LeadManagementModal } from './components/LeadManagementModal';
import { SettingsModal } from './components/SettingsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { SeoSchema } from './components/SeoSchema';

export default function App() {
  // Load initial company config from localStorage if present
  const [config, setConfig] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem('nd_company_config');
      return saved ? JSON.parse(saved) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  // Load leads list from localStorage
  const [leads, setLeads] = useState<LeadBooking[]>(() => {
    try {
      const saved = localStorage.getItem('nd_leads_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic Services list
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('nd_services_list');
      return saved ? JSON.parse(saved) : servicesList;
    } catch {
      return servicesList;
    }
  });

  // Dynamic Packages list
  const [packages, setPackages] = useState<PricePackage[]>(() => {
    try {
      const saved = localStorage.getItem('nd_packages_list');
      return saved ? JSON.parse(saved) : pricePackages;
    } catch {
      return pricePackages;
    }
  });

  // Dynamic Before/After Cases list
  const [cases, setCases] = useState<BeforeAfterCase[]>(() => {
    try {
      const saved = localStorage.getItem('nd_cases_list');
      return saved ? JSON.parse(saved) : beforeAfterCases;
    } catch {
      return beforeAfterCases;
    }
  });

  // Dynamic Customer Reviews list
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('nd_reviews_list');
      return saved ? JSON.parse(saved) : customerReviews;
    } catch {
      return customerReviews;
    }
  });

  // Dynamic FAQs list
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem('nd_faqs_list');
      return saved ? JSON.parse(saved) : faqsList;
    } catch {
      return faqsList;
    }
  });

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Check URL parameters or hash for admin entry link (?admin=true or #admin)
  useEffect(() => {
    const checkAdminUrl = () => {
      const search = window.location.search;
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (
        search.includes('admin') ||
        hash.includes('admin') ||
        path.includes('/admin')
      ) {
        setAdminModalOpen(true);
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    window.addEventListener('popstate', checkAdminUrl);
    return () => {
      window.removeEventListener('hashchange', checkAdminUrl);
      window.removeEventListener('popstate', checkAdminUrl);
    };
  }, []);

  // Selected preset data for booking modal
  const [modalInitialData, setModalInitialData] = useState<
    Partial<Omit<LeadBooking, 'id' | 'status' | 'createdAt'>>
  >({});

  // --- Real-time Firebase Sync Effects ---
  useEffect(() => {
    // Auto seed initial data to Firestore if database is empty
    seedDefaultDataToFirestore();

    // 1. Config
    const unsubConfig = subscribeCompanyConfig((remote) => {
      if (remote) {
        setConfig(remote);
        localStorage.setItem('nd_company_config', JSON.stringify(remote));
      }
    });

    // 2. Leads
    const unsubLeads = subscribeLeads((remote) => {
      if (remote) {
        setLeads(remote);
        localStorage.setItem('nd_leads_list', JSON.stringify(remote));
      }
    });

    // 3. Services
    const unsubServices = subscribeCollection<ServiceItem>('services', (remote) => {
      if (remote && remote.length > 0) {
        setServices(remote);
        localStorage.setItem('nd_services_list', JSON.stringify(remote));
      }
    });

    // 4. Packages
    const unsubPackages = subscribeCollection<PricePackage>('packages', (remote) => {
      if (remote && remote.length > 0) {
        setPackages(remote);
        localStorage.setItem('nd_packages_list', JSON.stringify(remote));
      }
    });

    // 5. Cases
    const unsubCases = subscribeCollection<BeforeAfterCase>('cases', (remote) => {
      if (remote && remote.length > 0) {
        setCases(remote);
        localStorage.setItem('nd_cases_list', JSON.stringify(remote));
      }
    });

    // 6. Reviews
    const unsubReviews = subscribeCollection<CustomerReview>('reviews', (remote) => {
      if (remote && remote.length > 0) {
        setReviews(remote);
        localStorage.setItem('nd_reviews_list', JSON.stringify(remote));
      }
    });

    // 7. FAQs
    const unsubFaqs = subscribeCollection<FaqItem>('faqs', (remote) => {
      if (remote && remote.length > 0) {
        setFaqs(remote);
        localStorage.setItem('nd_faqs_list', JSON.stringify(remote));
      }
    });

    return () => {
      unsubConfig();
      unsubLeads();
      unsubServices();
      unsubPackages();
      unsubCases();
      unsubReviews();
      unsubFaqs();
    };
  }, []);

  // Save handlers for each dataset with Firebase & localStorage persistence
  const handleSaveConfig = async (updated: CompanyConfig) => {
    setConfig(updated);
    localStorage.setItem('nd_company_config', JSON.stringify(updated));
    try {
      await saveCompanyConfigToFirestore(updated);
    } catch (err) {
      console.warn('Firebase config save error:', err);
    }
  };

  const handleSaveServices = async (updated: ServiceItem[]) => {
    setServices(updated);
    localStorage.setItem('nd_services_list', JSON.stringify(updated));
    try {
      await saveCollectionToFirestore('services', updated);
    } catch (err) {
      console.warn('Firebase services save error:', err);
    }
  };

  const handleSavePackages = async (updated: PricePackage[]) => {
    setPackages(updated);
    localStorage.setItem('nd_packages_list', JSON.stringify(updated));
    try {
      await saveCollectionToFirestore('packages', updated);
    } catch (err) {
      console.warn('Firebase packages save error:', err);
    }
  };

  const handleSaveCases = async (updated: BeforeAfterCase[]) => {
    setCases(updated);
    localStorage.setItem('nd_cases_list', JSON.stringify(updated));
    try {
      await saveCollectionToFirestore('cases', updated);
    } catch (err) {
      console.warn('Firebase cases save error:', err);
    }
  };

  const handleSaveReviews = async (updated: CustomerReview[]) => {
    setReviews(updated);
    localStorage.setItem('nd_reviews_list', JSON.stringify(updated));
    try {
      await saveCollectionToFirestore('reviews', updated);
    } catch (err) {
      console.warn('Firebase reviews save error:', err);
    }
  };

  const handleSaveFaqs = async (updated: FaqItem[]) => {
    setFaqs(updated);
    localStorage.setItem('nd_faqs_list', JSON.stringify(updated));
    try {
      await saveCollectionToFirestore('faqs', updated);
    } catch (err) {
      console.warn('Firebase faqs save error:', err);
    }
  };

  // Add new lead submission
  const handleAddLead = async (leadData: Omit<LeadBooking, 'id' | 'status' | 'createdAt'>) => {
    const tempLead: LeadBooking = {
      ...leadData,
      id: 'lead-' + Date.now(),
      status: 'new',
      createdAt: new Date().toLocaleString('vi-VN'),
    };
    const updatedLeads = [tempLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('nd_leads_list', JSON.stringify(updatedLeads));

    try {
      await addLeadToFirestore(leadData);
    } catch (err) {
      console.warn('Firebase lead add error:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem('nd_leads_list', JSON.stringify(updated));
    try {
      await deleteLeadFromFirestore(id);
    } catch (err) {
      console.warn('Firebase lead delete error:', err);
    }
  };

  // Clear leads list
  const handleClearLeads = async () => {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả danh sách đơn đã đăng ký không?')) {
      const currentLeads = [...leads];
      setLeads([]);
      localStorage.removeItem('nd_leads_list');
      try {
        await clearAllLeadsInFirestore(currentLeads);
      } catch (err) {
        console.warn('Firebase clear leads error:', err);
      }
    }
  };

  // Update lead status
  const handleUpdateLeadStatus = async (id: string, status: LeadBooking['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    localStorage.setItem('nd_leads_list', JSON.stringify(updated));
    try {
      await updateLeadStatusInFirestore(id, status);
    } catch (err) {
      console.warn('Firebase lead status update error:', err);
    }
  };

  // Reset all data to default
  const handleResetAllData = () => {
    setConfig(defaultConfig);
    setServices(servicesList);
    setPackages(pricePackages);
    setCases(beforeAfterCases);
    setReviews(customerReviews);
    setFaqs(faqsList);
    localStorage.removeItem('nd_company_config');
    localStorage.removeItem('nd_services_list');
    localStorage.removeItem('nd_packages_list');
    localStorage.removeItem('nd_cases_list');
    localStorage.removeItem('nd_reviews_list');
    localStorage.removeItem('nd_faqs_list');

    // Also push default to Firebase
    handleSaveConfig(defaultConfig);
    handleSaveServices(servicesList);
    handleSavePackages(pricePackages);
    handleSaveCases(beforeAfterCases);
    handleSaveReviews(customerReviews);
    handleSaveFaqs(faqsList);

    alert('Đã khôi phục toàn bộ dữ liệu mặc định ban đầu!');
  };

  // Triggers from Calculator / Service Cards / Pricing Packages
  const handleSelectServiceFromCard = (service: ServiceItem) => {
    setModalInitialData({
      serviceType: service.title,
      note: `Đăng ký từ danh mục dịch vụ: ${service.title}`,
    });
    setBookingModalOpen(true);
  };

  const handleSelectPackageFromPricing = (pkg: PricePackage) => {
    setModalInitialData({
      serviceType: pkg.name,
      note: `Đăng ký gói ưu đãi: ${pkg.name} (${pkg.price})`,
    });
    setBookingModalOpen(true);
  };

  const handleSelectEstimatedBooking = (details: {
    serviceType: string;
    areaSize: number;
    propertyType: string;
    estimatedPrice: number;
    note: string;
  }) => {
    setModalInitialData({
      serviceType: details.serviceType,
      estimatedPrice: details.estimatedPrice,
      note: details.note,
    });
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Dynamic SEO JSON-LD Schema Microdata */}
      <SeoSchema config={config} />

      {/* Main Header & Nav */}
      <Header
        config={config}
        onOpenBookingModal={() => {
          setModalInitialData({});
          setBookingModalOpen(true);
        }}
        onOpenSettingsModal={() => setSettingsModalOpen(true)}
        onOpenLeadModal={() => setLeadModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        leadCount={leads.length}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section with High-Converting Lead Form */}
        <HeroSection
          config={config}
          onSubmitLead={handleAddLead}
          onOpenBookingModal={() => {
            setModalInitialData({});
            setBookingModalOpen(true);
          }}
        />

        {/* 2. Interactive Quick Price Estimator / Calculator */}
        <QuickCalculator
          config={config}
          onSelectEstimatedBooking={handleSelectEstimatedBooking}
        />

        {/* 3. Detailed Services Showcase */}
        <ServicesSection
          config={config}
          services={services}
          onSelectService={handleSelectServiceFromCard}
        />

        {/* 4. Interactive Before & After Comparison */}
        <BeforeAfterSection cases={cases} />

        {/* 5. 4-Step Work Process */}
        <ProcessSection />

        {/* 6. Pricing Packages & Table */}
        <PricingSection
          config={config}
          packages={packages}
          onSelectPackage={handleSelectPackageFromPricing}
        />

        {/* 7. Why Choose Us / Guarantees */}
        <WhyChooseUs />

        {/* 8. Customer Reviews & Social Proof */}
        <TestimonialsSection reviews={reviews} />

        {/* 9. FAQs */}
        <FAQSection faqs={faqs} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Sticky Connectivity Buttons (Call, Zalo, FB, Mobile Bar) */}
      <FloatingContacts
        config={config}
        onOpenBookingModal={() => {
          setModalInitialData({});
          setBookingModalOpen(true);
        }}
      />

      {/* Modals */}
      <BookingFormModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        config={config}
        onSubmitLead={handleAddLead}
        initialData={modalInitialData}
      />

      <LeadManagementModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        leads={leads}
        onClearLeads={handleClearLeads}
        onUpdateStatus={handleUpdateLeadStatus}
        config={config}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      {/* Advanced Admin Portal Dashboard Modal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onClearLeads={handleClearLeads}
        onAddLeadManual={handleAddLead}
        onDeleteLead={handleDeleteLead}
        services={services}
        onSaveServices={handleSaveServices}
        packages={packages}
        onSavePackages={handleSavePackages}
        cases={cases}
        onSaveCases={handleSaveCases}
        reviews={reviews}
        onSaveReviews={handleSaveReviews}
        faqs={faqs}
        onSaveFaqs={handleSaveFaqs}
        onResetAllData={handleResetAllData}
      />
    </div>
  );
}

