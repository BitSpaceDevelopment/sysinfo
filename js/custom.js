var systemInfo = chrome.system;

function showBounds(bounds) {
  return bounds.left + ", " + bounds.top + ", " +
      bounds.width + ", " + bounds.height;
}

function showInsets(bounds) {
  return bounds.left + ", " + bounds.top + ", " +
      bounds.right + ", " + bounds.bottom;
}
// Get the information for your current system
function system_info() {
	// Get the window.navigation
	var sys_table = $("#sysTable");

	// console.log(systemInfo.storage.StorageUnitInfo);

	// Get the operating system name
	var OSName="unknown OS";
	var OSLogo = "system.png";
	if (navigator.appVersion.indexOf("Win")!=-1){
		OSName="Windows";
		OSLogo = "win.png";
	} else if (navigator.appVersion.indexOf("Mac")!=-1){
		OSName="Mac OS";
		OSLogo = "apple.png";
	} else if (navigator.appVersion.indexOf("Linux")!=-1){
		OSName="Linux";
		OSLogo = "linux.png";
	}else if (navigator.appVersion.indexOf("CrOS")!=-1){
		OSName="Chrome OS";
		OSLogo = "chrome.png";
	} else if (navigator.appVersion.indexOf("X11")!=-1){
		OSName="UNIX";
		OSLogo = "bsd.png";
	}

	var op_sys_output = "<img height='50px' src='img/" + OSLogo + "'>";
	document.getElementById("top_sys_output").innerHTML = op_sys_output;

	var op_sys_output = "<h2>" + OSName + " <img height='50px' src='img/" + OSLogo + "'></h2>";
	document.getElementById("main_sys_output").innerHTML = op_sys_output;

}

// Get the information for the browser you are running
function browser_info(){
	var browser_table = $("#browserTable");

	navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
	})();

	var code_name       = navigator.appCodeName;
	var platform        = navigator.platform;
	var app_name        = navigator.appName;
	var cookies_enabled = navigator.cookieEnabled;
	var online          = navigator.onLine;

	if (navigator.appVersion.indexOf("Chrome")!=-1){
		app_name="Chrome";
		// console.log(navigator.appVersion);
	}

	browser_table.append("<tr><td>Name</td><td>"           + app_name + "</td></tr>");
	browser_table.append("<tr><td>Version</td><td>"        + navigator.sayswho + "</td></tr>");
	browser_table.append("<tr><td>Code Name</td><td>"      + code_name + "</td></tr>");
	browser_table.append("<tr><td>Platform</td><td>"       + platform + "</td></tr>");
	browser_table.append("<tr><td>Cookie Enabled</td><td>" + cookies_enabled + "</td></tr>");
	browser_table.append("<tr><td>Online</td><td>"         + online + "</td></tr>");
}

// Get the display information for the screen
function display_info() {
	window.onerror=null;

	// The table to add rows to
	var display_table = $("#displayTable");

	var colors     = window.screen.colorDepth;
	var color_value = Math.pow (2, colors);
	var screenSize = '';

	if (screen.width) {
			var width = (screen.width) ? screen.width : '';
			var height = (screen.height) ? screen.height : '';
			screenSize += '' + width + " x " + height;
	}

	var font_smoothing = "No";

	if (window.screen.fontSmoothingEnabled == true){
		font_smoothing = "Yes";
	}	else{
		font_smoothing = "No";
	}

	var color_depth = window.screen.colorDepth;
	var available_width = window.screen.availWidth;
	var available_height = window.screen.availHeight;

	// Apply the data to the table
	display_table.append("<tr><td>Screen Size</td><td>" + screenSize + "</td></tr>");
	display_table.append("<tr><td>Height</td><td>" + height + "</td></tr>");
	display_table.append("<tr><td>Width</td><td>" + width + "</td></tr>");
	display_table.append("<tr><td>Available Height</td><td>" + available_height + "</td></tr>");
	display_table.append("<tr><td>Available Width</td><td>" + available_width + "</td></tr>");
	display_table.append("<tr><td>Color Depth</td><td>" + color_depth + "</td></tr>");
	display_table.append("<tr><td>Font Smoothing</td><td>" + font_smoothing + "</td></tr>");
}

function showDisplayInfo(display) {
  table = "<h3>Display - " + display.id + "</h3>" +
    "<table class='table table-hover'\n" +
    "<tr><td><b>Name</b></td><td>" + display.name + "</td></tr>" +
    "<tr><td><b>Mirroring Source Id</b></td><td>" + display.mirroringSourceId + "</td></tr>" +
    "<tr><td><b>Is Primary</b></td><td>" + display.isPrimary + "</td></tr>" +
    "<tr><td><b>Is Internal</b></td><td>" + display.isInternal + "</td></tr>" +
    "<tr><td><b>Is Enabled</b></td><td>" + display.isEnabled + "</td></tr>" +
    "<tr><td><b>DPI X</b></td><td>" + display.dpiX + "</td></tr>" +
    "<tr><td><b>DPI Y</b></td><td>" + display.dpiY + "</td></tr>" +
    "<tr><td><b>Rotation</b></td><td>" + display.rotation + "</td></tr>" +
    "<tr><td><b>Bounds</b></td><td>" + showBounds(display.bounds) + "</td></tr>" +
    "<tr><td><b>Overscan</b></td><td>" + showInsets(display.overscan) + "</td></tr>" +
    "<tr><td><b>Work Area</b></td><td>" + showBounds(display.workArea) + "</td></tr>" +
    "</table>\n";
  return table;
}

function bytesToMegaBytes(number) {
  return Math.round(number / 1024 / 1024);
}

function showStorageInfo(unit) {
  table = "<tr><td><b>ID</b></td><td>" + unit.id + "</td></tr>" +
    "<tr><td><b>Type</b></td><td>" + unit.type + "</td></tr>" +
    "<tr><td><b>Total Capacity (MB)</b></td><td>" + bytesToMegaBytes(unit.capacity) + "</td></tr>" +
    "<tr><td><b>Available Capacity (MB)</b></td><td>" + bytesToMegaBytes(unit.availableCapacity) + "</td></tr>" +
    "\n";
  return table;
}

function showCpuProcessorInfo(processor_number, processor) {
  table = "<tr><td>" + processor_number + "</td>" +
    "<td>" + processor.usage.idle + "</td>" +
    "<td>" + processor.usage.kernel + "</td>" +
    "<td>" + processor.usage.user + "</td>" +
    "<td>" + processor.usage.total + "</td>" +
    "</tr>\n";
  return table;
}

function eject_fs(btn){
  console.log(btn.data("fs_id"));
}

function init() {

	// Call main functions
	browser_info();
	display_info();
	system_info();

  $(".refresh-btn").click(function(){
      location.reload();
  });

  // Get display information.
  (function getDisplayInfo() {
    systemInfo.display.getInfo(function(displays) {
      var table = "<div class='table'>";
      for (var i = 0; i < displays.length; i++) {
        table += showDisplayInfo(displays[i]);
      }
      table += "</div>\n";
      var div = document.getElementById("display-list");
      div.innerHTML = table;
    });

    systemInfo.display.onDisplayChanged.addListener(getDisplayInfo);
  })();

  // Get CPU information.
  (function getCpuInfo() {
     systemInfo.cpu.getInfo(function(cpu) {
       var cpuInfo = "<b>Architecture:</b> " + cpu.archName +
         "<br><b>Model Name: </b>" + cpu.modelName +
         "<br><b>Number of Processors: </b>" + cpu.numOfProcessors +
         "<br><b>Features: </b>" + cpu.features.join(' ');

       cpuInfo += "<table class='table table-hover'  width=90%>\n" +
         "<tr><td><b>Processor</b></td>" +
         "<td><b>Idle time (ms)</b></td>" +
         "<td><b>Kernel time (ms)</b></td>" +
         "<td><b>User time (ms)</b></td>" +
         "<td><b>Total time (ms)</b></td>" +
         "</tr>\n";
       cpu.processors.forEach(function(processor, index) {
         cpuInfo += showCpuProcessorInfo(index+1, processor);
       });

       cpuInfo += "</table>\n";
			 var div = document.getElementById("main-cpu");
			 div.innerHTML = cpuInfo;
     });

     setTimeout(getCpuInfo, 1000);
  })();

  // Get memory information.
  (function getMemoryInfo() {
    systemInfo.memory.getInfo(function(memory) {

      var percent = (( memory.capacity - memory.availableCapacity) / memory.capacity) * 100;

      var memoryInfo =
      "<div class='progress'>" +
        "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: " + percent + "%'>" +
        "</div>" +
      "</div>" +
      "<b>Total Capacity:</b> " + bytesToMegaBytes(memory.capacity) + "MB" +
      "<br><b>Available Capacity: </b>" +
      bytesToMegaBytes(memory.availableCapacity) + "MB";


      var div = document.getElementById("memory-info");
      div.innerHTML = memoryInfo;
    });

    setTimeout(getMemoryInfo, 1000);
  })();

  // Get storage information.
  (function getStorageInfo() {
    systemInfo.storage.getInfo(function(units) {

      var table = "<div class='row storage'> \n";

      function showTable() {
        table += "</div>\n";
        var div = document.getElementById("storage-list");
        div.innerHTML = table;
      }

      function no_storage(){
        table += "<h6>The app was unable to probe for storage devices.. sorry</h6>";
      }

      if (units.length == 0){
        no_storage();
        return showTable();
      } else {

        units.forEach(function(unit, index) {
          if (unit.capacity > 0){
            var name = "";

            if (unit.name == ""){
              name = "Unnamed Device";
            } else {
              name = unit.name;
            }

            if (unit.type == "removable"){

              table += "<div class='col-md-4 unit palette palette-peter-river'>";
              table += "<img height='50px' src='img/usb.png'><h6>" + name + "</h6>";

            } else if (unit.type == "fixed"){

              table += "<div class='col-md-4 unit palette palette-amethyst'>";
              table += "<img height='50px' src='img/hdd.png'><h6>" + name + "</h6>";

            }

            table += "<table class='table' width=90%> \n";
            table += "<tr><td><b>ID</b></td><td>" + unit.id + "</td></tr>";

            if (unit.type == "removable"){
              table += "<tr><td><b>Type</b></td><td>Removable Drive</td></tr>";
            } else if (unit.type == "fixed"){
              table += "<tr><td><b>Type</b></td><td>Internal Drive</td></tr>";
            }

            table += "<tr><td><b>Capacity</b></td><td><b>" + bytesToMegaBytes(unit.capacity) + "</b>MB</td></tr>";

            if (unit.type == "removable"){

              // table += "<tr><td><button onclick='eject_fs($this)' class='btn btn-danger eject_button' data-fs_id='" + unit.id + "'>Eject</button></td></tr><td></td>";
            }

            table += "</table>";
            table += "</div>";

          }

        });

        showTable();
      }
    });

    systemInfo.storage.onAttached.addListener(getStorageInfo);
    systemInfo.storage.onDetached.addListener(getStorageInfo);
  })();
}

document.addEventListener('DOMContentLoaded', init);
