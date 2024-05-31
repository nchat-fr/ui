let url = "http://194.164.48.49:3000"
if (window.location.href.includes('localhost')) {
    url = "http://localhost:3000";
}

export default url;