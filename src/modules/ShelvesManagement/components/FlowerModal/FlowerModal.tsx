/* eslint-disable react/prop-types */
import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonDatetime,
} from '@ionic/react';
import { Formik, Form, Field, FieldAttributes } from 'formik';
import { connect } from 'react-redux';
import { getShowModal, getFlower } from '../../selectors/flowersModalSelectors';
import { flowerModalClose } from '../../actions/flowerModalActions';
import { getShelf } from '../../selectors/shelvesSelectors';
import { createFlower, editFlowerHandler } from '../../thunks/flowerThunk';
import { flowerValidationSchema } from './FlowerValidationSchema';
import { FlowerCardData } from '../../interfaces';

const input = ({ field, type, labelName }: FieldAttributes<any>) => (
  <IonItem lines="full">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput
      type={type}
      onIonChange={field.onChange}
      {...field} />
  </IonItem>
);

const textarea = ({ field, labelName }: FieldAttributes<any>) => (
  <IonItem lines="full">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonTextarea onIonChange={field.onChange} {...field} />
  </IonItem>
);

const datetime = ({ field, labelName }: FieldAttributes<any>) => (
  <IonItem lines="full">
    <IonLabel>{labelName}</IonLabel>
    <IonDatetime
      day-short-names
      displayFormat="MMMM/DD DDD"
      pickerFormat="MMM/DD"
      onIonChange={field.onChange}
      {...field} />
  </IonItem>
);

interface ModalProps {
  showModal: boolean;
  shelf: any;
  flower: FlowerCardData|null;
  flowerModalClose: () => void;
  createFlower: (data: any) => void;
  editFlowerHandler: (data: any) => void;
}

// eslint-disable-next-line react/prop-types
const FlowerModal:React.FC<ModalProps> = ({ showModal, shelf, flower, flowerModalClose, createFlower, editFlowerHandler }) => {
  const nextWateringAtDate = new Date();
  nextWateringAtDate.setDate(nextWateringAtDate.getDate() + 1);

  const initialValues = {
    name: flower?.name || '',
    description: flower?.description || '',
    wateringRule: flower?.wateringRule || 1,
    nextWateringAt: flower ?
      new Date(flower?.nextWateringAt).toUTCString()
      : nextWateringAtDate.toUTCString(),
  };

  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={flowerModalClose}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            { flower ? 'Edit' : 'Add'}
            {' '}
            Flower
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={initialValues}
          validationSchema={flowerValidationSchema}
          onSubmit={values => {
            if (flower) {
              editFlowerHandler({
                id: flower.id,
                ...values,
                shelfId: shelf._id,
              });
            } else {
              createFlower({
                ...values,
                shelfId: shelf._id,
              });
            }
          }}>
          {({ errors, touched, values }) => (
            <Form noValidate>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <Field
                      name="name"
                      component={input}
                      type="text"
                      value="second"
                      labelName="Flower Name" />
                    {errors.name && touched.name &&
                      <div className="ion-margin-horizontal error">{errors.name}</div>}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Field
                      name="description"
                      component={textarea}
                      labelName="Description" />
                    {errors.description && touched.description &&
                      <div className="ion-margin-horizontal error">{errors.description}</div>}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Field
                      name="wateringRule"
                      component={input}
                      type="number"
                      labelName="Watering Rule (Days)" />
                    {errors.wateringRule && touched.wateringRule &&
                      <div className="ion-margin-horizontal error">{errors.wateringRule}</div>}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Field
                      name="nextWateringAt"
                      component={datetime}
                      labelName="Next Watering At" />
                    {errors.wateringRule && touched.wateringRule &&
                      <div className="ion-margin-horizontal error">{errors.wateringRule}</div>}
                  </IonCol>
                </IonRow>
                <IonRow className="ion-text-center">
                  <IonCol>
                    <IonButton
                      type="submit"
                      color="secondary"
                      expand="block">
                      Save
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      fill="clear"
                      color="dark"
                      onClick={flowerModalClose}>
                      Cancel
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonModal>
  );
};

const mapStateToProps = (state: any) => ({
  showModal: getShowModal(state),
  shelf: getShelf(state),
  flower: getFlower(state),
});

const mapDispatchToProps = {
  flowerModalClose,
  createFlower: (data:any) => createFlower(data),
  editFlowerHandler: (data: any) => editFlowerHandler(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowerModal);
