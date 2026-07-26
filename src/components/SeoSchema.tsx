import React, { useEffect } from 'react';
import { CompanyConfig } from '../types';
import { faqsList, servicesList } from '../data/initialData';

interface SeoSchemaProps {
  config: CompanyConfig;
}

export const SeoSchema: React.FC<SeoSchemaProps> = ({ config }) => {
  useEffect(() => {
    // Set document title
    document.title = `${config.brandName} - Dọn Nhà, Vệ Sinh Công Nghiệp Trọn Gói TPHCM Giá Rẻ`;

    // LocalBusiness Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: config.brandName,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      telePhone: config.hotline,
      email: config.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.address,
        addressLocality: 'Thành phố Hồ Chí Minh',
        addressCountry: 'VN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 10.8231,
        longitude: 106.6297,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '06:00',
          closes: '22:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '2450',
      },
      priceRange: '12000VND - 2500000VND',
    };

    // FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqsList.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    };

    // Remove existing script tags if any
    const existingSchema = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchema.forEach((s) => s.remove());

    // Inject Schema 1
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script1);

    // Inject Schema 2
    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(faqSchema);
    document.head.appendChild(script2);

    return () => {
      script1.remove();
      script2.remove();
    };
  }, [config]);

  return null;
};
