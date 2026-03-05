import { TStreamDetails } from "../schema/base.schema";
import { TPremiumPricingData } from "../schema/premium.schema";
import {
    CheckCircle, ChevronRight, Star, Zap, Repeat, BarChart, BookOpen,
    FileText, Wrench, Sliders, Shuffle, TrendingUp, RefreshCcw,
    Cpu, Mail, MessageSquare, Phone, ArrowRight
} from "lucide-react";


export const PREMIUM_PRICING_DATA: TPremiumPricingData = {
    actualPrice: 200,
    discountPrice: 150,
    description: 'BALLB Entrance',
    duration: 'per month',
}


export const QR = ['/qr_mukund.png']


//  for premium form
export const uiTexts = {
    en: {
        title: "Activate Your Premium Membership",
        pricePrefix: "Rs",
        step1: "Make Payment",
        step2: "Upload Receipt",
        step2Desc: "After payment, upload the transaction screenshot here.",
        receiptUploaded: "Receipt Uploaded Successfully!",
        step3: "Submit Your Details",
        phoneLabel: "Contact Phone Number",
        phonePlaceholder: "e.g., 9845999999",
        submitButton: "Complete Membership",
        submittingButton: "Submitting...",
        successTitle: "Submission Received!",
        successMessage: "Thank you for your support. We'll activate your membership shortly.",
        supportTitle: "For Support or Inquiries:",
        feedbackPrompt: "Have feedback?",
        contactUs: "Contact us here",
        imageRequiredError: "Please upload your payment receipt before submitting.",
        submissionFailed: "Submission Failed"
    },
    np: {
        title: "आफ्नो प्रिमियम सदस्यता सक्रिय गर्नुहोस्",
        pricePrefix: "रु",
        step1: "भुक्तानी गर्नुहोस्",
        step2: "रसिद अपलोड गर्नुहोस्",
        step2Desc: "भुक्तानी पछि, कारोबारको स्क्रिनसट यहाँ अपलोड गर्नुहोस्।",
        receiptUploaded: "रसिद सफलतापूर्वक अपलोड भयो!",
        step3: "आफ्नो विवरण पेश गर्नुहोस्",
        phoneLabel: "सम्पर्क फोन नम्बर",
        phonePlaceholder: "उदाहरण, ९८४५९९९९९९",
        submitButton: "सदस्यता पूरा गर्नुहोस्",
        submittingButton: "पेश गर्दै...",
        successTitle: "अनुरोध प्राप्त भयो!",
        successMessage: "तपाईंको सहयोगको लागि धन्यवाद। हामी छिट्टै तपाईंको सदस्यता सक्रिय गर्नेछौं।",
        supportTitle: "समर्थन वा सोधपुछको लागि:",
        feedbackPrompt: "सुझाव छ?",
        contactUs: "यहाँ सम्पर्क गर्नुहोस्",
        imageRequiredError: "पेश गर्नु अघि कृपया आफ्नो भुक्तानी रसिद अपलोड गर्नुहोस्।",
        submissionFailed: "अनुरोध असफल भयो"
    }
}



//  for main premium page

// --- Bilingual Text Content ---
export const pageText = {
    en: {
        metaTitle: 'Loksewa Sopan | Premium',
        metaDescription: 'Unlock exclusive features, unlimited tests, and dedicated mentorship to supercharge your exam preparation with Loksewa Sopan Membership.',
        heroTitle: 'Unlock Your Full Potential with',
        heroTitleHighlight: 'Membership',
        heroSubtitle: 'Supercharge your prep with exclusive tools, unlimited practice, and dedicated support.',
        ctaBecomeMember: 'Become a Member',
        ctaStartTrial: 'Start Free Trial',
        missionTitle: 'For Students, By Students',
        missionText: "We're a passionate team of Nepali students building this platform to empower our peers. Your membership is more than just a purchase—it's a vital contribution that fuels our mission. It allows us to maintain the platform, add more high-quality resources, and grow a supportive community for all aspirants.",
        toolkitTitle: 'The Ultimate Toolkit for Your Success',
        freeTitle: "What's Included for Free",
        freeSubtitle: 'Get started. Enough for all.',
        premiumTitle: 'Unlock with Membership',
        premiumSubtitle: 'Gain the ultimate competitive edge.',
        premiumBadge: 'Best Value',
        premiumPlus: 'Everything in Free, plus:',
        contactTitle: "Have Questions? We're Here to Help",
        contactSubtitle: "Our team is always ready to assist you. Reach out to us anytime.",
        contactFacebook: 'Facebook',
        contactWhatsApp: 'WhatsApp',
        contactEmail: 'Email Us',
        finalCtaTitle: 'Ready to Begin Your Journey?',
        finalCtaButton: 'Get Started Now',
    },
    np: {
        metaTitle: 'लोकसेवा सोपान | प्रिमियम',
        metaDescription: 'लोकसेवा सोपान सदस्यता मार्फत विशेष सुविधाहरू, असीमित परीक्षाहरू, र समर्पित मार्गदर्शन अनलक गरी आफ्नो परीक्षा तयारीलाई गति दिनुहोस्।',
        heroTitle: 'आफ्नो पूर्ण क्षमता अनलक गर्नुहोस्',
        heroTitleHighlight: 'प्रिमियम सदस्यता',
        heroSubtitle: 'विशेष उपकरणहरू, असीमित अभ्यास, र समर्पित समर्थनको साथ आफ्नो तयारीलाई उत्कृष्ट बनाउनुहोस्।',
        ctaBecomeMember: 'सदस्य बन्नुहोस्',
        ctaStartTrial: 'नि:शुल्क परीक्षण सुरु गर्नुहोस्',
        missionTitle: 'विद्यार्थीहरूका लागि, विद्यार्थीहरूद्वारा',
        missionText: 'हामी नेपाली विद्यार्थीहरूको एक उत्साही टोली हौं जसले हाम्रा साथीहरूलाई सशक्त बनाउन यो प्लेटफर्म निर्माण गरेका छौं। तपाईंको सदस्यता एक खरिद मात्र होइन - यो हाम्रो अभियानलाई इन्धन दिने एक महत्त्वपूर्ण योगदान हो। यसले हामीलाई प्लेटफर्म कायम राख्न, थप उच्च-गुणस्तरका स्रोतहरू थप्न, र सबै aspirant हरूको लागि सहयोगी समुदाय बढाउन अनुमति दिन्छ।',
        toolkitTitle: 'तपाईंको सफलताको लागि अन्तिम टुलकिट',
        freeTitle: 'नि:शुल्क के-के समावेश छ',
        freeSubtitle: 'सुरु गर्नुहोस्। सबैको लागि पर्याप्त।',
        premiumTitle: 'सदस्यता मार्फत अनलक गर्नुहोस्',
        premiumSubtitle: 'अन्तिम प्रतिस्पर्धात्मक लाभ प्राप्त गर्नुहोस्।',
        premiumBadge: 'उत्कृष्ट मूल्य',
        premiumPlus: 'नि:शुल्कमा भएका सबै सुविधाहरू, साथै:',
        contactTitle: 'प्रश्नहरू छन्? हामी मद्दत गर्न यहाँ छौं',
        contactSubtitle: 'हाम्रो टोली तपाईंलाई सहयोग गर्न सधैं तयार छ। हामीलाई कुनै पनि समयमा सम्पर्क गर्नुहोस्।',
        contactFacebook: 'फेसबुक',
        contactWhatsApp: 'व्हाट्सएप',
        contactEmail: 'इमेल गर्नुहोस्',
        finalCtaTitle: 'आफ्नो यात्रा सुरु गर्न तयार हुनुहुन्छ?',
        finalCtaButton: 'अहिले सुरु गर्नुहोस्',
    }
};

export const featureLists = {
    en: {
        free: [
            { title: 'Limited Model Exams', icon: BarChart },
            { title: '10 Questions Per Test', icon: FileText },
            { title: 'Limited Subjects', icon: BookOpen },
            { title: 'Limited Chapters per Subject', icon: FileText },
            { title: 'Dashboard', icon: TrendingUp },
        ],
        premium: [
            { title: 'Unlock All Chapters', icon: CheckCircle },
            { title: 'Removed Question Limits on All Tests', icon: CheckCircle },
            { title: 'Personalized Performance Analyzer', icon: TrendingUp },
            { title: 'All Chapters Unlocked', icon: Repeat },
            { title: 'Community Support', icon: MessageSquare },
            { title: 'AI Based Analysis', icon: Cpu },
            { title: 'Priority Support & Early Access', icon: Star },
        ],
    },
    np: {
        free: [
            { title: 'सीमित मोडेल परीक्षा', icon: BarChart },
            { title: 'प्रत्येक परीक्षणमा १० प्रश्न', icon: FileText },
            { title: 'केहि सीमित विषयहरू', icon: BookOpen },
            { title: 'प्रत्येक विषयमा सीमित अध्यायहरू', icon: FileText },
            { title: 'ड्यासबोर्ड', icon: TrendingUp },
        ],
        premium: [
            { title: 'सबै अध्यायहरू अनलक गर्नुहोस्', icon: CheckCircle },
            { title: 'सबै परीक्षामा प्रश्नको सीमा हटाइयो', icon: CheckCircle },
            { title: 'व्यक्तिगत कार्यसम्पादन विश्लेषक', icon: TrendingUp },
            { title: 'सबै अध्याय पुन: प्रयास गर्न मिल्ने', icon: Repeat },
            { title: 'सामुदायिक समर्थन', icon: MessageSquare },
            { title: 'एआई-आधारित विश्लेषण', icon: Cpu },
            { title: 'प्राथमिकता समर्थन र नयाँ सुविधाहरूको शीघ्र पहुँच', icon: Star },
        ],
    }
};




//  trial page
export const trialPageText = {
    en: {
        form: {
            title: "Claim Your Free Trial",
            description: "Get free access to all membership features for 5 days.",
            phoneLabel: "Phone Number",
            phonePlaceholder: "e.g., 9845999999",
            phoneError: "A valid 10-digit phone number is required.",
            submitButton: "Get Free Trial",
            submittingButton: "Submitting...",
            footerLink: "Want full access?",
            footerAction: "Apply for Membership",
            supportTitle: "For Support or Inquiries:"
        },
        success: {
            title: "Trial Activated!",
            description: (name: string) => `Enjoy exclusive membership features on EduLocus for 5 days, ${name}.`,
            duration: "5 days",
            button: "Explore Tests"
        },
        toast: {
            errorTitle: "Submission Failed",
            errorDesc: "Please try again later."
        }
    },
    np: {
        form: {
            title: "आफ्नो नि:शुल्क परीक्षण दाबी गर्नुहोस्",
            description: "५ दिनको लागि सबै सदस्यता सुविधाहरूमा नि:शुल्क पहुँच पाउनुहोस्।",
            phoneLabel: "फोन नम्बर",
            phonePlaceholder: "उदाहरण, ९८४५९९९९९९",
            phoneError: "एक मान्य १०-अंकको फोन नम्बर आवश्यक छ।",
            submitButton: "नि:शुल्क परीक्षण पाउनुहोस्",
            submittingButton: "पेश गर्दै...",
            footerLink: "पूर्ण पहुँच चाहनुहुन्छ?",
            footerAction: "सदस्यताको लागि आवेदन दिनुहोस्",
            supportTitle: "समर्थन वा सोधपुछको लागि:"
        },
        success: {
            title: "परीक्षण सक्रिय भयो!",
            description: (name: string) => `${name}, ५ दिनको लागि EduLocus मा विशेष सदस्यता सुविधाहरूको आनन्द लिनुहोस्।`,
            duration: "५ दिन",
            button: "परीक्षाहरू अन्वेषण गर्नुहोस्"
        },
        toast: {
            errorTitle: "अनुरोध असफल भयो",
            errorDesc: "कृपया पछि पुन: प्रयास गर्नुहोस्।"
        }
    }
}
