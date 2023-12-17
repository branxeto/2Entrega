document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const Rut = document.getElementById("Rut").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/usuarios/ingresar", {

    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Rut: Rut,
        password: password,
      }),
      
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.success) {
        console.log("login failed");
        alert(data.message);
        return;
      }
      localStorage.setItem("jwt", data.jwt);
      window.location.href = "../index.html";
    
    });
});