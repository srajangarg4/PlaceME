import { Routes } from 'utils';
import {
  GeneralDetailSection,
  PersonalDetailSection,
  AcademicDetailSection,
  DocumentsDetailSection,
} from '../components/formSections';

const formSections = {
  general: {
    path: Routes.profile.path,
    text: 'General Details',
    view: GeneralDetailSection,
  },
  personal: {
    path: Routes.personalDetail.path,
    text: 'Personal Information',
    view: PersonalDetailSection,
  },
  academics: {
    path: Routes.academicDetail.path,
    text: 'Academics',
    view: AcademicDetailSection,
  },
  documents: {
    path: Routes.documents.path,
    text: 'Documents & Certificates',
    view: DocumentsDetailSection,
  },
};

export default formSections;
