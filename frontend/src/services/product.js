import http from "../http-common"

class ProductDataService {
    getAll() {
        return http.get("");
    }

    get(id) {
        return http.get(`/${id}`);
    }

    addProduct(link) {
        return http.post(`/add?link=${link}`);
    }
}

export default new ProductDataService();