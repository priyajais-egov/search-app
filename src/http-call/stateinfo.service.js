import axios from 'axios';
import { BACKEND } from '../util/url';

const http = axios.create({
    baseURL: window.location.origin
});

export default class StateInfoService {

    static dropDownDetails = () => {
        const req = {
            "RequestInfo": {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_search",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": null
            },
            "MdmsCriteria": {
                "tenantId": "pb",
                "moduleDetails": [
                    {
                        "moduleName": "common-masters",
                        "masterDetails": [

                            {
                                "name": "StateInfo"
                            }
                        ]
                    }
                ]
            }
        };
        return http.post(BACKEND.DROPDOWN_DETAILS_API, req, {
            proxy: {
                host: 'https://egov-micro-dev.egovernments.org'
            }
        });
    };

    static search = (queryParams) => {
        const payload = {
            "RequestInfo": {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_search",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": null
            }
        }
        return http.post(BACKEND.SEARCH_API + '&' + queryParams, payload);
    };

};