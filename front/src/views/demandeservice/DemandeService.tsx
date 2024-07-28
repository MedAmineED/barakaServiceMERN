/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, useCallback, useEffect, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import './style.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DemandeServiceTable from './demandeServiceTable/DemandeServiceTable';
import ServiceListModal from './servicesListModal/ServiceListModal';
import LigneDemande from '../../entities/LigneDemande';
import ServiceEntity from 'src/entities/ServiceEntity';
import Article from 'src/entities/Article';
import ArticleListModal from './ArticleListModal/ArticleListModal';
import { useDemandeService } from '../../customHooks/useDemandeService';


const fixFloat = (num : number) : number => parseFloat(num.toFixed(3))

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

const DemandeService: FC = () => {
  
  const { servicesState, 
          articlesState, 
          ligneDemande,
           handleItemChange, 
           reset } = useDemandeService();
  return (
    <MainCmp>
      <ItemHeader
        title="Demande service"
        buttonText="Ajouter Employé"
        onButtonClick={() => {}}
      />
      <Container fluid className="full-height-container">
        <Row className="mt-4 full-height-row global-container-dmn">
          <Col xs={12} md={5} className="full-height-col demande-data-inp">
            <Form name="frmArticle" className="compact-form">
              <div className="section">
                <div className="section-title inputs-sec-title">Véhicule</div>
                <div className="inline-inputs">
                  <Form.Group controlId="matriculeInput" className="mb-2 input-container">
                    <Form.Label>Matricule</Form.Label>
                    <Form.Control type="text" size="sm" placeholder="Saisir Matricule" />
                  </Form.Group>
                  <Form.Group controlId="marqueInput" className="mb-2 input-container">
                    <Form.Label>Marque</Form.Label>
                    <Form.Control type="text" size="sm" placeholder="Saisir Marque" />
                  </Form.Group>
                </div>
                <Form.Group controlId="conducteurInput" className="mb-2">
                  <Form.Label>Conducteur</Form.Label>
                  <Form.Control type="text" size="sm" placeholder="Saisir Conducteur" />
                </Form.Group>
              </div>
              <hr className="section-divider" />
              <div className="section">
                <div className="section-title inputs-sec-title">Client</div>
                <div className="inline-inputs">
                  <Form.Group controlId="nomClientInput" className="mb-2 input-container">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" size="sm" placeholder="Saisir Nom" />
                  </Form.Group>
                  <Form.Group controlId="NBCommandeInput" className="mb-2 input-container">
                    <Form.Label>N° Bon de commande</Form.Label>
                    <Form.Control type="text" size="sm" placeholder="Saisir N° Bon de commande" />
                  </Form.Group>
                </div>
              </div>
              <hr className="section-divider" />
              <div className="section">
                <Form.Group controlId="empInput" className="mb-2">
                  <div className="inputs-sec-title">Employé</div>
                  <Form.Control as="select" size="sm">
                    <option selected disabled>Employé</option>
                    <option value="1">Employé 1</option>
                    <option value="2">Employé 2</option>
                  </Form.Control>
                </Form.Group>
                <hr className="section-divider" />
                <div className="inline-inputs">
                  <Form.Group controlId="hdInput" className="mb-2">
                    <Form.Label>Heure Début</Form.Label>
                    <Form.Control as="select" size="sm">
                      <option value="8:00">8:00</option>
                      <option value="8:15">8:15</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="hfInput" className="mb-2">
                    <Form.Label>Heure Fin</Form.Label>
                    <Form.Control as="select" size="sm">
                      <option value="17:00">17:00</option>
                      <option value="17:15">17:15</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <hr className="section-divider" />
              <div id="forcrud"></div>
            </Form>
          </Col>
          <Col xs={12} md={7} className="full-height-col result-demande">
            <div className="content dmn-srv-content-section">
              <div className="mb-4">
                <Container>
                  <Row className="justify-content-between">
                    <Col>
                      <ServiceListModal 
                          resetData={reset}
                          onSaveItems={() => {}}
                          checkAction={handleItemChange}
                          selectedServices={servicesState}
                            />
                    </Col>
                    <Col>
                      <ArticleListModal 
                      resetData={reset}
                      onSaveItems={() => {}}
                      checkAction={handleItemChange}
                      selectedArticles={articlesState}
                      />
                    </Col>
                    <Col>
                      <Button className="btn btn-primary custom-btn custom-btn-1">Ajouter service</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <DemandeServiceTable
                srv = {ligneDemande}
                data={ligneDemande}
                columns={columns}
                onDelete={(id: number) => handleItemChange(false, { id } as ServiceEntity | Article)}
                
              />
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="secondary" className="me-2 custom-btn custom-btn-reset"  onClick={reset}>Réinitialiser</Button>
                  <Button variant="primary" className= "custom-btn custom-btn-save" onClick={()=> {console.log(ligneDemande)}}>Enregistrer</Button>
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
