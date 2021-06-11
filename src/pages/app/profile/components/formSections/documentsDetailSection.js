import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  File as FileInput,
  Input,
  SelectOption,
} from 'components';
import { useFormReducer } from 'hooks';
import { required, unflatten } from 'utils';
import { useSelector } from 'react-redux';
import { DocumentUploadService } from 'placeme-services/lib';
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

const NewDocumentUploadCard = ({
  connectField,
  titleFieldName,
  fileFieldName,
  typeFieldName,
}) => {
  return (
    <Card className="p-3">
      <div>
        {connectField(titleFieldName, {
          label: 'File title',
        })(Input)}
        {connectField(fileFieldName, {
          label: 'Upload document',
        })(FileInput)}
        {connectField(typeFieldName, {
          label: 'Choose document type',
          options: documentType,
        })(SelectOption)}
      </div>
    </Card>
  );
};

const DocumentsDetailSection = ({ isFormEditable }) => {
  const documents = useSelector((state) => state.documents);

  const { addField, connectField, handleSubmit, submitting } = useFormReducer();

  const [numOfDocs, setNumOfDocs] = useState(0);

  const [positionOfNewDoc, setPositionOfNewDoc] = useState(0);

  useEffect(() => {
    const numOfDocsFetched = documents?.length ?? 3;
    setNumOfDocs(numOfDocsFetched);
    setPositionOfNewDoc(numOfDocsFetched);
  }, [documents]);

  const addDocumentField = useCallback(
    (index) => {
      addField(`doc_${index}_title`, [
        required('Title is required for easy navigation.'),
      ]);
      addField(`doc_${index}_doc`, [
        required("We can't proceed without a document."),
      ]);
      addField(`doc_${index}_type`, [required('Please choose a type')]);
    },
    [addField],
  );

  return (
    <div>
      {/* to render already uploaded documents */}
      {[...Array(numOfDocs)].map((_, index) => {
        return <DocumentCard key={index.toString()} {...documents[index]} />;
      })}

      {/* for new document upload */}
      {[...Array(positionOfNewDoc - numOfDocs)].map((_, index) => {
        const position = index;
        return (
          <NewDocumentUploadCard
            key={position?.toString()}
            connectField={connectField}
            fileFieldName={`doc_${position}_doc`}
            titleFieldName={`doc_${position}_title`}
            typeFieldName={`doc_${position}_type`}
          />
        );
      })}

      <div className="row d-flex justify-content-end my-3 mx-0">
        <Button
          disabled={!isFormEditable}
          text="Add Document"
          onClick={() => {
            addDocumentField(positionOfNewDoc - numOfDocs);
            setPositionOfNewDoc(positionOfNewDoc + 1);
          }}
        />
      </div>
      {isFormEditable && (
        <Button
          onClick={handleSubmit(async (data) => {
            const docs = unflatten(data);
            const file = docs.doc[0];
            const { title, doc, type } = { ...file };

            const service = new DocumentUploadService();
            console.log('Data for update', docs);
            const { successful, error, result } = await service.add({
              doc,
              title,
              type,
            });

            if (successful) {
              console.log('Sucessfully', result);
            } else {
              console.error('Eroror', error);
            }
          })}
          fullWidth
          text="Send for Update"
          loading={submitting}
        />
      )}
    </div>
  );
};

export default DocumentsDetailSection;
