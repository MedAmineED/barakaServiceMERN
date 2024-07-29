import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import './style.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DemandeServiceTable from './demandeServiceTable/DemandeServiceTable';
import ServiceListModal from './servicesListModal/ServiceListModal';
import ArticleListModal from './ArticleListModal/ArticleListModal';
import { useDemandeService } from '../../customHooks/useDemandeService';
import DemandeServiceService from '../../ApiServices/DemandeServiceService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import ServiceEntity from '../../entities/ServiceEntity';
import Article from '../../entities/Article';

const fixFloat = (num: number): number => parseFloat(num.toFixed(3));

const columns = [
  { header: 'N°', accessor: 'index' },
  { header: 'libelle', accessor: 'designation' },
  { header: 'prix unitaire', accessor: 'prix' },
  { header: 'quantite', accessor: 'quantite' },
  { header: 'prix HT', accessor: 'prix' },
  { header: 'remise U', accessor: 'remise' },
  { header: 'tax', accessor: 'tax' },
  { header: 'tax total', accessor: 'tax_total' },
  { header: 'prix TTC', accessor: 'prix_TTC' },
];

const initialFormData: DemandeServiceEntity = {
  matricule: '',
  marque: '',
  conducteur: '',
  client: '',
  bon_commande: '',
  employer: '',
  heure_deb: '',
  heure_fin: '',
  payer: 0,
  prix_ttc: 0,
  lignedemande: [],
};

const DemandeService: FC = () => {
  const { servicesState, articlesState, ligneDemandeArr, handleItemChange, reset } = useDemandeService();
  const [formData, setFormData] = useState<DemandeServiceEntity>(initialFormData);

  const getPrixTTC = useCallback((prixTTC: number) => {
    setFormData((prevData) => ({ ...prevData, prix_ttc: prixTTC }));
  }, []);


  const addDemandeService = useCallback(async () => {
    // Log formData to ensure it includes lignedemande
    console.log("FormData before request:", formData);
    console.log("LigneDemandeArr:", ligneDemandeArr);
  
    try {
      const data = await DemandeServiceService.AddDemandeService(ApiUrls.DEMANDE_SERVICE, formData);
      setFormData(initialFormData);
      reset();
      console.log("Data from request:", data);
      console.log("demande service added successfully", data);
    } catch (error) {
      console.error('Error adding demande service:', error);
    }
  }, [formData, ligneDemandeArr]);
  

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }, []);


  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lignedemande: ligneDemandeArr
    }));
    console.log("runned")
  }, [ligneDemandeArr]);


  const vehicleSection = useMemo(() => (
    <div className="section">
      <div className="section-title inputs-sec-title">Véhicule</div>
      <div className="inline-inputs">
        <Form.Group controlId="matricule" className="mb-2 input-container">
          <Form.Label>Matricule</Form.Label>
          <Form.Control type="text" size="sm" placeholder="Saisir Matricule" value={formData.matricule} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="marque" className="mb-2 input-container">
          <Form.Label>Marque</Form.Label>
          <Form.Control type="text" size="sm" placeholder="Saisir Marque" value={formData.marque} onChange={handleChange} />
        </Form.Group>
      </div>
      <Form.Group controlId="conducteur" className="mb-2">
        <Form.Label>Conducteur</Form.Label>
        <Form.Control type="text" size="sm" placeholder="Saisir Conducteur" value={formData.conducteur} onChange={handleChange} />
      </Form.Group>
    </div>
  ), [formData.matricule, formData.marque, formData.conducteur, handleChange]);

  const clientSection = useMemo(() => (
    <div className="section">
      <div className="section-title inputs-sec-title">Client</div>
      <div className="inline-inputs">
        <Form.Group controlId="client" className="mb-2 input-container">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" size="sm" placeholder="Saisir Nom" value={formData.client} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="bon_commande" className="mb-2 input-container">
          <Form.Label>N° Bon de commande</Form.Label>
          <Form.Control type="text" size="sm" placeholder="Saisir N° Bon de commande" value={formData.bon_commande} onChange={handleChange} />
        </Form.Group>
      </div>
    </div>
  ), [formData.client, formData.bon_commande, handleChange]);

  const employeeSection = useMemo(() => (
    <div className="section">
      <Form.Group controlId="employer" className="mb-2">
        <div className="inputs-sec-title">Employé</div>
        <Form.Control as="select" size="sm" value={formData.employer} onChange={handleChange}>
          <option disabled>Employé</option>
          <option value="1">Employé 1</option>
          <option value="2">Employé 2</option>
        </Form.Control>
      </Form.Group>
      <hr className="section-divider" />
      <div className="inline-inputs">
        <Form.Group controlId="heure_deb" className="mb-2">
          <Form.Label>Heure Début</Form.Label>
          <Form.Control as="select" size="sm" value={formData.heure_deb} onChange={handleChange}>
            <option value="8:00">8:00</option>
            <option value="8:15">8:15</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="heure_fin" className="mb-2">
          <Form.Label>Heure Fin</Form.Label>
          <Form.Control as="select" size="sm" value={formData.heure_fin} onChange={handleChange}>
            <option value="17:00">17:00</option>
            <option value="17:15">17:15</option>
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  ), [formData.employer, formData.heure_deb, formData.heure_fin, handleChange]);

  const memoizedServiceListModal = useMemo(() => (
    <ServiceListModal
      resetData={reset}
      onSaveItems={() => {}}
      checkAction={handleItemChange}
      selectedServices={servicesState}
    />
  ), [reset, handleItemChange, servicesState]);

  const memoizedArticleListModal = useMemo(() => (
    <ArticleListModal
      resetData={reset}
      onSaveItems={() => {}}
      checkAction={handleItemChange}
      selectedArticles={articlesState}
    />
  ), [reset, handleItemChange, articlesState]);

  return (
    <MainCmp>
      <ItemHeader title="Demande service" buttonText="Ajouter Employé" onButtonClick={() => {}} />
      <Container fluid className="full-height-container">
        <Row className="mt-4 full-height-row global-container-dmn">
          <Col xs={12} md={5} className="full-height-col demande-data-inp">
            <Form name="frmArticle" className="compact-form">
              {vehicleSection}
              <hr className="section-divider" />
              {clientSection}
              <hr className="section-divider" />
              {employeeSection}
              <hr className="section-divider" />
            </Form>
          </Col>
          <Col xs={12} md={7} className="full-height-col result-demande">
            <div className="content dmn-srv-content-section">
              <div className="mb-4">
                <Container>
                  <Row className="justify-content-between">
                    <Col>
                      {memoizedServiceListModal}
                    </Col>
                    <Col>
                      {memoizedArticleListModal}
                    </Col>
                    <Col>
                      <Button className="btn btn-primary custom-btn custom-btn-1">Ajouter service</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <DemandeServiceTable
                srv={ligneDemandeArr}
                data={ligneDemandeArr}
                columns={columns}
                onDelete={(id: number) => handleItemChange(false, { id } as ServiceEntity | Article)}
                getPrixTTC={getPrixTTC}
              />
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="secondary" className="me-2 custom-btn custom-btn-reset" onClick={reset}>Réinitialiser</Button>
                  <Button variant="primary" className="custom-btn custom-btn-save" onClick={()=> {addDemandeService()}}>Enregistrer</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        
      </Container>
    </MainCmp>
  );
};

export default DemandeService;
