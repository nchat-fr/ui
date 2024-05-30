class ApiError extends Error {
    constructor(response: any, json: any, text: any) {
        super(response.statusText);
        this.http_status = response.status;
        this.json = json;
        this.text = text;
    }
}

async function getResponseJsonOrNull(response: any) {
    try {
        return await response.json();
    } catch (err) {
        return null;
    }
}

async function getResponseTextOrNull(response: any) {
    try {
        return await response.text();
    } catch (err) {
        return null;
    }
}

class Api {

    async request(request: Request) {
        let error = null;

        try {
            const response = await fetch(request);
            if (response.status < 400) {
                return await response.json();
            } else {
                error = new ApiError(response, getResponseJsonOrNull(response), getResponseTextOrNull(response));
            }
        } catch (error: any) {
            error = new Error(error);
        }

        throw error;
    }

    async get(url: string) {
        const request = new Request(`http://localhost:3000/${url}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        });
        return await this.request(request);
    }

    async post(url: string, body: any) {
        const request = new Request(`http://localhost:3000/${url}/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body)
        });
        return await this.request(request);
    }

    async put(url: string, body: any) {
        const request = new Request(`http://localhost:3000/${url}/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body)
        });
        return await this.request(request);
    }

    async patch(url: string, body: any) {
        const request = new Request(`http://localhost:3000/${url}/`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body)
        });
        return await this.request(request);
    }

    async delete(url: string) {
        const request = new Request(`http://localhost:3000/${url}/`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        });
        return await this.request(request);
    }
}

const api = new Api()
export default api;