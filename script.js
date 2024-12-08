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
  
  // Authenticate anonymously
  firebase.auth().signInAnonymously()
    .then(() => {
      console.log("Authentication successful");
    })
    .catch((error) => {
      console.error("Authentication error:", error.message);
    });
  
  $(document).ready(function () {
    const dbRef = firebase.database().ref("ADMIN_MATERIAL");
  
    // Initialize DataTable
    const table = $("#almacenTable").DataTable({
      responsive: true,
      autoWidth: false,
      columns: [
        { title: "CodMat" },
        { title: "Descripcion" },
        { title: "UM" },
        { title: "CantidadActual" },
        // { title: "FechaReg" },
        // { title: "CantidadReg" },
        // { title: "Extra" },
        
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
  
    // Fetch data from Firebase
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data);
      table.clear();
  
      if (data) {
        Object.keys(data).forEach((key) => {
          const item = data[key];
          table.row.add([
            item.ID || "N/A",
            item.Descripcion || "N/A",
            item.UM || "N/A",
            item.CantidadActual || "N/A",
            // item.FechaReg || "N/A",
            // item.CantidadReg || "0",
            // item.Extra || "0",
           
          ]);
        });
      } else {
        console.warn("No data found in ADMIN_MATERIAL");
      }
  
      table.draw();
    }, (error) => {
      console.error("Database read error:", error.message);
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
  $(document).ready(function () {
    // Handle sidebar clicks for Almacen and Salidas Mat
    $(".sidebar-link").click(function () {
      $(".sidebar-link").removeClass("is-active");
      $(this).addClass("is-active");
      $(".main-container").hide(); // Hide all main containers
  
      if ($(this).hasClass("almacen")) {
        $(".almacen-container").show(); // Show Almacen content
      } else if ($(this).hasClass("salidas-mat")) {
        $(".salidas-mat-container").show(); // Show Salidas Mat content
      }
    });
  
    // Initialize Salidas Mat DataTable
    const dbRefSalidas = firebase.database().ref("Cuadrilla_Material");
    const tableSalidas = $("#salidasMatTable").DataTable({
      responsive: true,
      autoWidth: false,
      columns: [
        { title: "CodMat" },
        { title: "CantidadRecib" },
        { title: "FechaRecib" },
        { title: "CuadrillaName" },
        { title: "FolioRecep" },
        //{ title: "Unidad" },
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
  
    // Fetch data from Firebase for Salidas Mat
    dbRefSalidas.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched Salidas Mat data:", data);
      tableSalidas.clear();
  
      if (data) {
        Object.keys(data).forEach((key) => {
          const item = data[key];
          tableSalidas.row.add([
            item.codigo_recib || "N/A",
            item.CantidadRecib || "N/A",
            item.FechaRecib || "N/A",
            item.CuadrillaName || "N/A",
            item.folio_recep || "0",
           // item.Unidad || "N/A",
          ]);
        });
      } else {
        console.warn("No data found in SALIDAS_MATERIAL");
      }
  
      tableSalidas.draw();
    });
  });
  
