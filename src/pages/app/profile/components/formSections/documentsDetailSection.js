import React from 'react';
import {
  Button,
  Card,
  File as FileInput,
  Input,
  SelectOption,
} from 'components';
import { useFormReducer } from 'hooks';
import { useSelector } from 'react-redux';
import { PendingRequestService } from 'placeme-services/lib';
import { documentType } from 'assets';

const DocumentCard = ({ link, title, uploadedOn }) => (
  <Card className="p-3">
    <div>
      <h5>{title}</h5>
      <p className="blockquote-footer">
        Uploaded on : {uploadedOn?.toString()}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary"
      >
        View
      </a>
    </div>
  </Card>
);

const NewDocumentUploadCard = ({ connectField }) => {
  return (
    <Card className="p-3">
      <div>
        {connectField('doc', {
          label: 'File title',
        })(Input)}
        {connectField('title', {
          label: 'Upload document',
        })(FileInput)}
        {connectField('type', {
          label: 'Choose document type',
          options: documentType,
        })(SelectOption)}
      </div>
    </Card>
  );
};

const DocumentsDetailSection = ({ isFormEditable, setIsFormEditable }) => {
  const documents = useSelector((state) => state.document);
  const { connectField, handleSubmit, submitting } = useFormReducer();

  const numOfDocs = documents?.length ?? 0;

  return (
    <div>
      {/* to render already uploaded documents */}
      {[...Array(numOfDocs)].map((_, index) => {
        return <DocumentCard key={index.toString()} {...documents[index]} />;
      })}

      {/* for new document upload */}

      {isFormEditable && (
        <>
          <NewDocumentUploadCard connectField={connectField} />
          <Button
            onClick={handleSubmit(async (data) => {
              const { doc, type, title } = { ...data };

              const service = new PendingRequestService();
              let requestTitle = '';
              let comment = '';
              requestTitle = prompt('Enter a message for this update');
              comment = prompt('Enter a comment.');
              if (requestTitle && comment) {
                const { successful, error, result } = await service.add({
                  updatesRequired: { file: doc, title, type },
                  type: 'DOCUMENT',
                  title: requestTitle,
                  comment,
                });

                if (successful) {
                  console.log('Sucessfully', result);
                  setIsFormEditable(false);
                } else {
                  console.error('Eroror', error);
                }
              }
            })}
            fullWidth
            text="Send for Update"
            loading={submitting}
          />
        </>
      )}
    </div>
  );
};

export default DocumentsDetailSection;
