interface ApiUrlsIn {
    readonly ARTICLE : string,
    readonly FAMILLE : string,
    readonly SERVICE : string,
    readonly CATEGORIE : string,
    readonly EMPLOYEE : string,
    readonly DEMANDE_SERVICE : string;
}

const url = "http://localhost:5055/";

const ApiUrls: ApiUrlsIn = {
    ARTICLE : url + "api/articles",
    FAMILLE : url + "api/familles",
    SERVICE : url + "api/services",
    CATEGORIE: url + "api/categories",
    EMPLOYEE: url + "api/employees",
    DEMANDE_SERVICE : url + "api/demande-services"
}

export default ApiUrls;