// Include Firebase Configuration
// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyAmUH1B1JDgQMHsVML3Fd4unZ8fzAQuq7s",
    authDomain: "tsterapp-fcf1b.firebaseapp.com",
    databaseURL: "https://tsterapp-fcf1b-default-rtdb.firebaseio.com",
    projectId: "tsterapp-fcf1b",
    storageBucket: "tsterapp-fcf1b.appspot.com",
    messagingSenderId: "27987269810",
    appId: "1:27987269810:web:5da5ddb5d3e526739751ab",
    measurementId: "G-XNS6DBLVEY",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  $(document).ready(function () {
    // Firebase database reference
    const dbRef = firebase.database().ref("ADMIN_MATERIAL");
  
    // Initialize DataTable
    const table = $("#almacenTable").DataTable({
      responsive: true,
      autoWidth: false,
      columns: [
        { title: "ID" },
        { title: "Descripcion" },
        { title: "Cuadrilla" },
        { title: "FechaReg" },
        { title: "CantidadReg" },
        { title: "Extra" },
        { title: "UM" },
      ],
      language: {
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  
    // Fetch and populate data from Firebase
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data); // Debug: Check fetched data
      table.clear(); // Clear existing rows
  
      if (data) {
        // Loop through keys (e.g., "3") and add rows to the DataTable
        Object.keys(data).forEach((key) => {
          const item = data[key];
          table.row.add([
            item.ID || "N/A",
            item.Descripcion || "N/A",
            item.Cuadrilla || "N/A",
            item.FechaReg || "N/A",
            item.CantidadReg || "0",
            item.Extra || "0",
            item.UM || "N/A",
          ]);
        });
      } else {
        console.warn("No data found in Firebase for ADMIN_MATERIAL");
      }
  
      table.draw(); // Redraw the DataTable
    });

  
  

  
  
    // Handle video hover play/pause
    const allVideos = document.querySelectorAll(".video");
    allVideos.forEach((v) => {
      v.addEventListener("mouseover", () => {
        const video = v.querySelector("video");
        video.play();
      });
      v.addEventListener("mouseleave", () => {
        const video = v.querySelector("video");
        video.pause();
      });
    });
  
    // Video streaming interaction
    $(".logo, .logo-expand, .discover").on("click", function () {
      $(".main-container").removeClass("show");
      $(".main-container").scrollTop(0);
    });
  
    $(".trending, .video").on("click", function () {
      $(".main-container").addClass("show");
      $(".main-container").scrollTop(0);
      $(".sidebar-link").removeClass("is-active");
      $(".trending").addClass("is-active");
    });
  
    $(".video").click(function () {
      const source = $(this).find("source").attr("src");
      const title = $(this).find(".video-name").text();
      const person = $(this).find(".video-by").text();
      const img = $(this).find(".author-img").attr("src");
      $(".video-stream video").stop();
      $(".video-stream source").attr("src", source);
      $(".video-stream video").load();
      $(".video-p-title").text(title);
      $(".video-p-name").text(person);
      $(".video-detail .author-img").attr("src", img);
    });
  });
  
