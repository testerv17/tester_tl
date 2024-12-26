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
  $(document).ready(function () {
    let map;
    const bucketMarkers = [];
    const markerMap = {}; // Map folios to markers
    const layers = {};
    const infoWindow = new google.maps.InfoWindow();
  
    // Map and Polygon Configuration
    const polygons = {
      cto1: [/* Coordinates for CTO 1 */],
      cto2: [/* Coordinates for CTO 2 */],
      cto3: [/* Coordinates for CTO 3 */],
      cto4: [/* Coordinates for CTO 4 */],
      cto5: [/* Coordinates for CTO 5 */],
    };
  
    const table = $("#circuitoTable").DataTable({
      responsive: true,
      autoWidth: false,
      columns: [
        { title: "Folio" },
        { title: "Rpu" },
        { title: "Lampara" },
        { title: "Estatus" },
        { title: "Capacidad" },
        { title: "Reporte" },    
        { title: "TiempoAtención" }, // New column
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
  
    // Initialize the map
    window.initMap = function () {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.772, lng: -100.314 },
        zoom: 15,
      });
  
      // Create polygon layers
      for (const [key, coords] of Object.entries(polygons)) {
        layers[key] = new google.maps.Polygon({
          paths: coords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
      }
  
      // Add event listeners for layer toggles
      $(".layer-toggle").each(function () {
        $(this).on("change", function () {
          const layerKey = $(this).data("layer");
          if ($(this).is(":checked")) {
            layers[layerKey].setMap(map); // Turn on layer
          } else {
            layers[layerKey].setMap(null); // Turn off layer
          }
        });
      });
    };
  
    // Function to calculate time difference
    function calculateTimeDifference(start, end) {
      const startTime = new Date(start);
      const endTime = new Date(end);
  
      if (isNaN(startTime) || isNaN(endTime)) {
        return "N/A"; // Return "N/A" if either time is invalid
      }
  
      const diff = Math.abs(endTime - startTime); // Difference in milliseconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  
    // Fetch WorkDone data for a specific folio
    function fetchWorkDoneData(folio, callback) {
      const workDoneRef = firebase.database().ref("WorkDone");
      workDoneRef.orderByChild("folio").equalTo(folio).once("value", (snapshot) => {
        if (snapshot.exists()) {
          const workDoneData = Object.values(snapshot.val())[0];
          const { inicio_job = null, fin_job = null } = workDoneData;
          const tiempoAtencion = calculateTimeDifference(inicio_job, fin_job);
          callback(null, { ...workDoneData, tiempoAtencion });
        } else {
          callback("No work done found for this folio", null);
        }
      });
    }
  
    // Populate table and map with data
    function populateTableAndMap() {
      const bucketRef = firebase.database().ref("CIRCUITO");
  
      bucketRef.on("value", (snapshot) => {
        const data = snapshot.val();
        table.clear();
  
        // Clear existing markers
        bucketMarkers.forEach((marker) => marker.setMap(null));
        bucketMarkers.length = 0;
  
        // Iterate over fetched data
        for (const key in data) {
          const job = data[key];
          const {
            folio = key, // Use the key as a fallback for Folio
            capacidad = "N/A",
            estatus = "N/A",
            lampara = "N/A",
            latitud = null,
            longitud = null,
            rpu = "N/A",
            trabajo = "N/A",
           // work_done = "N/A",
          } = job;
  
          // Filter: Only include records where trabajo is not "sr"
          if (trabajo !== "sr") {
            // Fetch WorkDone data for TiempoAtención
            fetchWorkDoneData(folio, (error, workDoneData) => {
              let tiempoAtencion = "N/A";
              if (!error && workDoneData) {
                tiempoAtencion = workDoneData.tiempoAtencion;
              }
  
              // Add row to DataTable
              table.row.add([
                `<span class="folio-link" data-folio="${folio}">${folio}</span>`,
                rpu,
                lampara,
                estatus,
                capacidad,
                trabajo,
                //work_done,
                tiempoAtencion,
              ]);
  
              table.draw();
            });
  
            // Add marker to map
            if (latitud && longitud) {
              const icon = {
                url: "lamp_Blink_Red.gif",
                scaledSize: new google.maps.Size(72, 72),
              };
  
              const marker = new google.maps.Marker({
                position: { lat: parseFloat(latitud), lng: parseFloat(longitud) },
                map: map,
                title: `CIRCUITO - ${trabajo}`,
                icon: icon,
                optimized: false,
              });
  
              // Add click listener for InfoWindow
              marker.addListener("click", () => {
                fetchWorkDoneData(folio, (error, workDoneData) => {
                  let additionalInfo = "";
                  if (!error && workDoneData) {
                    const {
                      work_done = "N/A",
                      estatus = "N/A",
                      inicio_job = "N/A",
                      fin_job = "N/A",
                      tiempoAtencion = "N/A",
                    } = workDoneData;
  
                    additionalInfo = `
                      <tr>
                        <td style="font-weight: bold; padding: 4px;">Trabajo Realizado:</td>
                        <td style="padding: 4px;">${work_done}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; padding: 4px;">Estatus:</td>
                        <td style="padding: 4px;">${estatus}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; padding: 4px;">Inicio del Trabajo:</td>
                        <td style="padding: 4px;">${inicio_job}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; padding: 4px;">Fin del Trabajo:</td>
                        <td style="padding: 4px;">${fin_job}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; padding: 4px;">Tiempo de Atención:</td>
                        <td style="padding: 4px;">${tiempoAtencion}</td>
                      </tr>
                    `;
                  } else {
                    additionalInfo = `<tr><td colspan="2" style="color: red; padding: 4px;">${error}</td></tr>`;
                  }
  
                  const content = `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                      <h4 style="margin: 0; padding: 0 0 5px; font-size: 16px; color: #007BFF;">Detalle-Lampara</h4>
                      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr>
                          <td style="font-weight: bold; padding: 4px;">Folio:</td>
                          <td style="padding: 4px;">${folio}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; padding: 4px;">Rpu:</td>
                          <td style="padding: 4px;">${rpu}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; padding: 4px;">Lampara:</td>
                          <td style="padding: 4px;">${lampara}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; padding: 4px;">Capacidad:</td>
                          <td style="padding: 4px;">${capacidad}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; padding: 4px;">Reporte:</td>
                          <td style="padding: 4px;">${trabajo}</td>
                        </tr>
                        ${additionalInfo}
                      </table>
                    </div>
                  `;
                  infoWindow.setContent(content);
                  infoWindow.open(map, marker);
                });
              });
  
              // Map folio to marker
              markerMap[folio] = marker;
              bucketMarkers.push(marker);
            }
          }
        }
      });
    }
  
    // Zoom to marker when clicking on folio
    $("#circuitoTable tbody").on("click", ".folio-link", function () {
      const folio = $(this).data("folio");
      const marker = markerMap[folio];
      if (marker) {
        map.setCenter(marker.getPosition());
        map.setZoom(18); // Zoom in
        google.maps.event.trigger(marker, "click"); // Simulate marker click to show InfoWindow
      }
    });
  
    // Initialize map and populate data
    $(".streaming-tab").click(function () {
      $(".main-container").hide();
      $(".streaming-container").show();
      initMap();
      populateTableAndMap();
    });
  });
  $(document).ready(function () {
    // Modal Toggle Function
    function toggleModal(modalId, show) {
      const modal = $(`#${modalId}`);
      if (show) {
        modal.css("right", "0"); // Slide in
        modal.show(); // Make visible
      } else {
        modal.css("right", "-50%"); // Slide out
        setTimeout(() => modal.hide(), 500); // Hide after transition
      }
    }
  
    // Close Button Functionality
    $(".close").click(function () {
      const modalId = $(this).closest(".modal").attr("id");
      toggleModal(modalId, false); // Trigger slide-out animation
    });
  
    // Entregado Button Functionality
    $("#entregadoButton").click(function () {
      toggleModal("entregadoModal", true); // Open modal
  
      // Initialize Entregado Table
      const entregadoTable = $("#entregadoTable").DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        columns: [
          { title: "Codigo Recib" },
          { title: "Descripcion" },
          { title: "Cuadrilla Name" },
          { title: "Fecha Recib" },
          { title: "Folio Recep" },
          { title: "Cantidad Recib" },
        ],
      });
  
      // Fetch data for Entregado
      const dbRefEntregado = firebase.database().ref("Cuadrilla_Material");
      dbRefEntregado.on("value", (snapshot) => {
        const data = snapshot.val();
        entregadoTable.clear();
  
        Object.keys(data).forEach((key) => {
          const item = data[key];
          const adminRef = firebase.database().ref(`ADMIN_MATERIAL/${item.codigo_recib}`);
          adminRef.once("value", (adminSnapshot) => {
            const adminData = adminSnapshot.val();
            entregadoTable.row.add([
              item.codigo_recib || "N/A",
              adminData?.Descripcion || "N/A",
              item.CuadrillaName || "N/A",
              item.FechaRecib || "N/A",
              item.folio_recep || "N/A",
              item.CantidadRecib || "N/A",
            ]);
            entregadoTable.draw();
          });
        });
      });
  
      // Initialize Regreso Table
      const regresoTable = $("#regresoTable").DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        columns: [
          { title: "Cod Reg" },
          { title: "Folio Reg" },
          { title: "Fecha Reg" },
          { title: "Cantidad Reg" },
        ],
      });
  
      // Fetch data for Regreso
      const dbRefRegreso = firebase.database().ref("Cuadrilla_regreso");
      dbRefRegreso.on("value", (snapshot) => {
        const data = snapshot.val();
        regresoTable.clear();
  
        Object.keys(data).forEach((key) => {
          const item = data[key];
          regresoTable.row.add([
            item.cod_reg || "N/A",
            item.folio_reg || "N/A",
            item.FechaReg || "N/A",
            item.reg_cant || "N/A",
          ]);
        });
  
        regresoTable.draw();
      });
    });
  
    // Tab Switching
    $(".tab-link").click(function () {
      $(".tab-link").removeClass("active");
      $(this).addClass("active");
  
      $(".tab-content").removeClass("active");
      $(`#${$(this).data("tab")}Container`).addClass("active");
    });
  });

  //Evidencias Nav Link

  

  $(document).ready(function () {
    // Initialize Firebase Configurations
    const firebaseConfigMain = {
      apiKey: "AIzaSyCGuGpJEWo1_9gWwgSv3JO9s1051wDpY6E",
      authDomain: "alumbradopubliconte.firebaseapp.com",
      databaseURL: "https://alumbradopubliconte-default-rtdb.firebaseio.com",
      projectId: "alumbradopubliconte",
      storageBucket: "alumbradopubliconte.appspot.com",
      messagingSenderId: "842157703635",
      appId: "1:842157703635:web:64db480e6191f6c0326f26",
      measurementId: "G-H4PG2MM8S5",
    };
  
    const firebaseConfigSecondary = {
      apiKey: "AIzaSyAmUH1B1JDgQMHsVML3Fd4unZ8fzAQuq7s",
      authDomain: "tsterapp-fcf1b.firebaseapp.com",
      databaseURL: "https://tsterapp-fcf1b-default-rtdb.firebaseio.com",
      projectId: "tsterapp-fcf1b",
      storageBucket: "tsterapp-fcf1b.firebasestorage.app",
      messagingSenderId: "27987269810",
      appId: "1:27987269810:web:5da5ddb5d3e526739751ab",
      measurementId: "G-XNS6DBLVEY",
    };
  
    const appMain = firebase.initializeApp(firebaseConfigMain, "main");
    const appSecondary = firebase.initializeApp(firebaseConfigSecondary, "secondary");
    const dbMain = appMain.database();
    const dbSecondary = appSecondary.database();
  
    // Toggle Modal Visibility
    function toggleModal(modalId, show) {
      const modal = $(`#${modalId}`);
      if (show) {
        modal.css("right", "0");
        modal.show();
      } else {
        modal.css("right", "-50%");
        setTimeout(() => modal.hide(), 500);
      }
    }
  
    // Timestamp Formatting Function
    function formatTimestamp(timestamp) {
      if (!timestamp) return "Invalid timestamp";
      const [date, time] = timestamp.split("T");
      const formattedTime = time.split(".")[0];
      return `${date} ${formattedTime}`;
    }
  
    // Close Modal
    $(".close").click(function () {
      const modalId = $(this).closest(".modal").attr("id");
      toggleModal(modalId, false);
    });
  
    // Handle Full-Size Image Click
    function showFullImage(imageUrl) {
      const fullImageModal = $("#fullImageModal");
      fullImageModal.find("img").attr("src", imageUrl);
      fullImageModal.show();
    }
  
    $("#fullImageModal .close").click(function () {
      $("#fullImageModal").hide();
    });
  
    // Toggle Gallery View
$("#toggleViewSwitch").change(function () {
  $("#gallery").toggleClass("list-view");
});

    // Handle Evidencias Button Click
    $("#evidenciasButton").click(function () {
      toggleModal("evidenciasModal", true);
  
      const galleryContainer = $("#gallery");
      galleryContainer.empty(); // Clear previous content
  
      // Fetch WorkDone Data from Primary Database
      dbMain.ref("WorkDone").once("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((key) => {
            const item = data[key];
            const folio = item.folio;
            const imageUrl = item.image_url;
            const rawTimestamp = item.timestamp;
            const timestamp = formatTimestamp(rawTimestamp); // Format the timestamp
  
            // Fetch Additional Data from Secondary Database
            dbSecondary.ref("WorkDone").orderByChild("folio").equalTo(parseInt(folio)).once("value", (snap) => {
              const secondaryData = snap.val();
              const additionalData = secondaryData ? Object.values(secondaryData)[0] : {};
              const workDone = additionalData.work_done || "No Data";
              const estatus = additionalData.estatus || "No Status";
  
              // Create Gallery Card
              const galleryCard = `
                <div class="gallery-card" onclick="showFullImage('${imageUrl}')">
                    <img src="${imageUrl}" alt="Evidencia for folio ${folio}" />
                  <div class="gallery-info">
                    <p><strong>Folio:</strong> ${folio}</p>
                    <p><strong>FechaAt:</strong> ${timestamp}</p>
                    <p><strong>Atención:</strong> ${workDone}</p>
                    <p><strong>Estatus:</strong> ${estatus}</p>
                  </div>
                </div>
              `;
  
              galleryContainer.append(galleryCard);
            });
          });
        }
      });
    });
  });
  