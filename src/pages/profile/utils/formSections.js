import {
  GeneralDetailSection,
  PersonalDetailSection,
  AcademicDetailSection,
  DocumentsDetailSection,
} from '../components/formSections';

const formSections = {
  general: {
    text: 'General Details',
    view: GeneralDetailSection,
  },
  personal: {
    text: 'Personal Information',
    view: PersonalDetailSection,
  },
  academics: {
    text: 'Academics',
    view: AcademicDetailSection,
  },
  documents: {
    text: 'Documents & Certificates',
    view: DocumentsDetailSection,
  },
};

export default formSections;
