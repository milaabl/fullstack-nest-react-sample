import React from 'react';
import { IonModal, IonButton, IonRow, IonCol, IonLabel, IonGrid, IonInput, IonItem, IonText, IonTextarea, IonSpinner } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';
import { Formik, Form, Field } from 'formik';

import { connect } from 'react-redux';
import { schema } from '../../helpers/shelfAddEditModalHelper';
import { ShelfAddEditModalData } from '../../../../services/shelfAddEditModalService';
import { shelfAddEditModalThunk } from '../../thunks/shelfAddEditModalThunk';
import { shelfAddEditModalClose, shelfAddEditModalSubmitted } from '../../actions/shelfAddEditModalActions';
import { uploadShelfImage } from '../../thunks/shelvesThunk';
import { getAddEditSuccess, getErrorMsg, getShowModal, getShelfId, getLocation, getDescription, getImageShelf } from '../../selectors/shelfAddEditModalSelectors';
import PhotoInput from '../../../../common/PhotoInput/PhotoInput';
import { getUploadImageShelfLocation, getErrorMessageUploadImg, getSubmitUploadImgShelf } from '../../selectors/shelvesSelectors';
import { toastSuccessUploadShelfImage } from '../../actions/uploadImageActions';
import { getImage } from '../../helpers/uploadImageHelper';
import BasicToast from '../../../../common/Toast/BasicToast';

import './ShelfAddEditModal.scss';
import Shelf from '../../../../assets/shelf.jpg';

const Input = ({ field, type, labelName, isSubmitting }: FieldAttributes<any>) => (
  <IonItem lines="full">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput disabled={isSubmitting} type={type} onIonChange={field.onChange} {...field} />
  </IonItem>
);

const InputTextarea = ({ field, type, labelName, isSubmitting }: FieldAttributes<any>) => (
  <IonItem lines="full">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonTextarea disabled={isSubmitting} type={type} onIonChange={field.onChange} {...field} />
  </IonItem>
);

const ShelfAddEditModal: React.FC = ({ success,
  errorMsg,
  id,
  location,
  description,
  onSubmitted,
  onShelfAddEditModal,
  showModal,
  onCloseModal,
  onUploadImage,
  toastUploadImageShelfLocation,
  submitUploadImgShelf,
  ontoastSuccessUploadShelfImage,
  imageShelf,
  errorMessageUploadImg }
: Record<string, any>): JSX.Element => {
  const initialValues: ShelfAddEditModalData = {
    id,
    location: location || '',
    description: description || '',
  };
  const getImgShelfModal = (): string => getImage(imageShelf, Shelf);

  return (
    <IonModal isOpen={showModal} backdropDismiss={false} cssClass="shelf-add-edit-modal">
      <IonGrid className="shelf-add-edit-modal">
        <IonRow className="shelf-add-edit-modal">
          <IonCol className="shelf-add-edit-modal">
            { id ? <PhotoInput uploadImage={onUploadImage} shelfId={id} /> : null }
            <img className="shelf-add-edit-modal__img" src={getImgShelfModal()} alt="shelf" />
          </IonCol>
          <IonCol size-xs="9" size-sm="7" className="shelf-add-edit-modal">

            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onSubmitted();
                const res = await onShelfAddEditModal(values);
                if (res && !id) {
                  resetForm();
                }
              }}>
              {({ errors, touched, isSubmitting }) => (
                <Form noValidate>
                  <IonRow>
                    <IonCol class="ion-text-justify ion-padding-horizontal">
                      <h3>
                        <b>
                          {id ? 'Edit ' : 'Add new ' }
                          shelf
                        </b>
                      </h3>
                      <IonText color="medium">
                        {id ? 'Edit ' : 'Add new '}
                        flowers shelf, describe location and small description
                      </IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow className="row-input ion-align-items-center">
                    <IonCol>
                      <Field name="location" component={Input} type="text" labelName="Location" />
                      {errors.location && touched.location && <div className="ion-margin-horizontal error">{errors.location}</div>}

                      <Field name="description" component={InputTextarea} type="text" labelName="Description" />
                      {errors.description && touched.description && <div className="ion-margin-horizontal error">{errors.description}</div>}

                      <BasicToast
                        isOpen={success || !!errorMsg}
                        handleOnDidDismiss={onSubmitted}
                        // eslint-disable-next-line no-nested-ternary
                        message={success ? id ? 'Shelf edited' : 'New shelf added' : `Oops, something went wrong: ${errorMsg}`}
                        type={success ? 'success' : 'warning'} />
                      <BasicToast
                        message={toastUploadImageShelfLocation ?
                          `The picture of the shelf ${toastUploadImageShelfLocation} successfully updated.`
                          : `Oops, something went wrong: ${errorMessageUploadImg}`}
                        handleOnDidDismiss={() => ontoastSuccessUploadShelfImage(false)}
                        type={toastUploadImageShelfLocation ? 'success' : 'warning'}
                        isOpen={submitUploadImgShelf || !!errorMessageUploadImg} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton disabled={isSubmitting} type="submit" expand="block" className="ion-text-uppercase">
                        {id ? 'EDIT' : 'ADD'}
                        {isSubmitting && <IonSpinner className="ion-margin-start" />}
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton disabled={isSubmitting} onClick={() => onCloseModal()} fill="clear" className="ion-text-capitalize">
                        Cancel
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </Form>
              )}
            </Formik>

          </IonCol>
        </IonRow>
      </IonGrid>
    </IonModal>
  );
};

const mapStateToProps = (state: any) => ({
  success: getAddEditSuccess(state),
  errorMsg: getErrorMsg(state),
  showModal: getShowModal(state),
  id: getShelfId(state),
  location: getLocation(state),
  description: getDescription(state),
  toastUploadImageShelfLocation: getUploadImageShelfLocation(state),
  submitUploadImgShelf: getSubmitUploadImgShelf(state),
  imageShelf: getImageShelf(state),
  errorMessageUploadImg: getErrorMessageUploadImg(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  onShelfAddEditModal: (data: ShelfAddEditModalData) => dispatch(shelfAddEditModalThunk(data)),
  onCloseModal: () => dispatch(shelfAddEditModalClose()),
  onSubmitted: () => dispatch(shelfAddEditModalSubmitted()),
  onUploadImage: (file: Blob, id: string) => dispatch(uploadShelfImage(file, id)),
  ontoastSuccessUploadShelfImage: (isSubmitted: boolean) => dispatch(toastSuccessUploadShelfImage(isSubmitted)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShelfAddEditModal);
