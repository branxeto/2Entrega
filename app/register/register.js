document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const Name =document.getElementById("Name").value;
    const Rut = document.getElementById("Rut").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/usuarios/crear", {

    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        Name: Name,
        Rut: Rut,
        password: password,
      }),
      
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.success) {
        console.log("register failed");
        alert(data.message);
        return;
      }
    window.location.href = "../index.html";
    });
});