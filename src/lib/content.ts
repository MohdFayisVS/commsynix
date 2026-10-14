export const defaults = {
  "heroTitle": "Intelligent systems.",
  "heroAccent": "Connected possibilities.",
  "heroText": "Technology that brings people, spaces, and ideas together. From IT and AV to AI, IoT, and smart mobility—built around your needs.",
  "heroButton": "Discuss your project",
  "servicesTitle": "One partner.\nA world of smart solutions.",
  "servicesText": "From the network beneath your business to the experiences your customers see, we connect the pieces into a coherent system.",
  "divisionsTitle": "Smarter thinking.\nStronger connections.",
  "aiKicker": "INTELLIGENCE THAT WORKS WITH YOU",
  "aiTitle": "Turn ideas into\nuseful intelligence.",
  "aiText": "Explore AI solutions for everyday business workflows, customer interactions, and meaningful automation.",
  "aiFeature1": "AI workflow automation",
  "aiFeature2": "Conversational assistants",
  "aiFeature3": "Custom AI integration",
  "iotKicker": "YOUR WORLD, CONNECTED",
  "iotTitle": "Make your spaces\nmore responsive.",
  "iotText": "Connect devices, sensors, and control systems to make your environment easier to understand and manage.",
  "iotFeature1": "Smart home & office systems",
  "iotFeature2": "Connected monitoring",
  "iotFeature3": "Device & sensor integration",
  "mobilityTitle": "A better-connected journey.",
  "mobilityText": "Bus PA, digital signage, stop announcements, passenger information, news, and custom advertising—bringing communication on the move into focus.",
  "projectsTitle": "Ideas brought to life.",
  "projectsText": "Explore our published work as the portfolio grows.",
  "aboutTitle": "Technology in sync\nwith your vision.",
  "aboutIntro": "COMMSYNIX SMART SYSTEMS brings IT, ELV, AV, automation, lighting, AI, IoT, and smart mobility together under one connected vision.",
  "aboutText": "Serving India and the UAE, we focus on understanding your requirements and designing systems that work together—from a single space to a broader technology ecosystem.",
  "contactTitle": "Your next idea\nstarts here.",
  "contactText": "Tell us what you want to achieve.\nWe’ll help you explore the possibilities.",
  "footerText": "Connected thinking. Intelligent possibilities.",
  "indiaPhone": "+91 8884008432",
  "uaePhone": "+971 52 168 7833",
  "address": "1/290 Silent Valley, Mukkali PO,\nMannarkkad, Palakkad, Kerala, India",
  "email": "",
  "heroImage": "",
  "heroAlt": "COMMSYNIX smart systems",
  "showServices": true,
  "showDivisions": true,
  "showMobility": true,
  "showProjects": true,
  "showAbout": true,
  "showContact": true,
  "showTestimonials": true,
  "testimonialsTitle": "What our clients say.",
  "testimonialsText": "Experiences shared by our clients.",
  "services": [
    {
      "title": "IT & Networking",
      "text": "Connected foundations for modern businesses.",
      "list": "Network design · Structured cabling · Wi-Fi · IT infrastructure"
    },
    {
      "title": "ELV & Security",
      "text": "Visibility, control, and confidence in every space.",
      "list": "CCTV · Access control · Integrated security systems"
    },
    {
      "title": "AV & Digital Signage",
      "text": "Make every message, meeting, and experience count.",
      "list": "Professional audio · Video walls · Collaboration · Digital signage"
    },
    {
      "title": "Automation & Lighting",
      "text": "Spaces that respond to the way you live and work.",
      "list": "Smart homes · Control systems · Lighting integration"
    },
    {
      "title": "Smart Mobility",
      "text": "Connected experiences beyond the building.",
      "list": "Bus PA & signage · Stop announcements · Passenger information"
    },
    {
      "title": "Systems Integration",
      "text": "Bring your technology together with purpose.",
      "list": "Design · Integration · Configuration · Support"
    }
  ]
};
export const contentLabels:Record<string,string> = {
  "heroTitle": "Banner heading",
  "heroAccent": "Banner second line",
  "heroText": "Banner description",
  "heroButton": "Banner button label",
  "servicesTitle": "Services heading",
  "servicesText": "Services introduction",
  "divisionsTitle": "AI & IoT section heading",
  "aiKicker": "AI label",
  "aiTitle": "AI heading",
  "aiText": "AI description",
  "aiFeature1": "AI feature 1",
  "aiFeature2": "AI feature 2",
  "aiFeature3": "AI feature 3",
  "iotKicker": "IoT label",
  "iotTitle": "IoT heading",
  "iotText": "IoT description",
  "iotFeature1": "IoT feature 1",
  "iotFeature2": "IoT feature 2",
  "iotFeature3": "IoT feature 3",
  "mobilityTitle": "Mobility heading",
  "mobilityText": "Mobility description",
  "projectsTitle": "Projects heading",
  "projectsText": "Projects introduction",
  "aboutTitle": "About heading",
  "aboutIntro": "About introduction",
  "aboutText": "About text",
  "contactTitle": "Contact heading",
  "contactText": "Contact introduction",
  "footerText": "Footer description"
};
export type SiteContent = typeof defaults;
export function phoneDigits(phone:string){return phone.replace(/[^0-9]/g, "");}
