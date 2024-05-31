let url = "http://85.215.133.119:3000"
if (window.location.href.includes('localhost')) {
    url = "http://localhost:3000";
}

export default url;