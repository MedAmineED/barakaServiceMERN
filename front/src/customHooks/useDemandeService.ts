/* eslint-disable @typescript-eslint/no-explicit-any */
// useItemState.ts
import { useState, useCallback, useMemo } from 'react';
import Article from '../entities/Article';
import LigneDemande from '../entities/LigneDemande';
import  ServiceEntity from '../entities/ServiceEntity';

type Item = ServiceEntity | Article;

const createLigneDemande = (item: Item): LigneDemande => {
  const isService = 'libelle' in item;
  return {
    demande_srv: item.id || 0,
    type: isService ? "service" : "article",
    categorie: (isService ? (item as ServiceEntity).categorie : (item as Article).famille) || "autre",
    element: item.id || 0,
    reference: isService ? "some_reference" : (item as Article).identification,
    designation: isService ? (item as ServiceEntity).libelle : (item as Article).designation,
    prix: isService ? (item as ServiceEntity).pu : (item as Article).prix_vente,
    tva: isService ? 0 : (item as Article).tva,
    remise: isService ? (item as ServiceEntity).remise : 0,
    quantite: isService ? 1 : (item as Article).qte,
    tax: 0,
    tax_total: 0,
    prix_TTC: isService 
      ? parseFloat(((item as ServiceEntity).pu - (item as ServiceEntity).remise).toFixed(3))
      : (item as Article).prix_vente * (1 + (item as Article).tva / 100)
  };
};

export const useDemandeService = () => {
  const [servicesState, setServicesState] = useState<ServiceEntity[]>([]);
  const [articlesState, setArticlesState] = useState<Article[]>([]);

  const handleItemChange = useCallback((check: boolean, item: Item) => {
    const stateUpdater = 'libelle' in item ? setServicesState : setArticlesState;
    stateUpdater((prevState: any[]) => {
      if (check) {
        return [...prevState, item];
      } else {
        return prevState.filter(i => i.id !== item.id);
      }
    });
  }, []);

  const reset = useCallback(() => {
    setServicesState([]);
    setArticlesState([]);
  }, []);

  const ligneDemande = useMemo(() => {
    return [
      ...servicesState.map(createLigneDemande),
      ...articlesState.map(createLigneDemande)
    ];
  }, [servicesState, articlesState]);

  return {
    servicesState,
    articlesState,
    ligneDemande,
    handleItemChange,
    reset
  };
};