console.log('Netflix Visualization Dashboard - Loading...');

let viz;
let workbook;
let activeSheet;

// Tableau Public dashboard URL
const url = "https://public.tableau.com/views/NetflixVisualization_17247273581690/Netflix?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

// Get DOM elements
const vizContainer = document.getElementById('vizContainer');
const exportPDF = document.getElementById('exportPDF');
const exportImage = document.getElementById('exportImage');

// Tableau visualization options
const options = {
    hideTabs: true,
    height: 800,
    width: 1470,
    onFirstInteraction: function () {
        try {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
            console.log("✅ Dashboard is interactive and ready!");
            
            // Enable export buttons after first interaction
            enableExportButtons();
        } catch (error) {
            console.error("❌ Error in first interaction:", error);
        }
    },
    onLoad: function () {
        console.log("✅ Tableau dashboard loaded successfully!");
        hideLoadingMessage();
    }
};

// Function to hide loading message
function hideLoadingMessage() {
    const loadingDiv = vizContainer.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

// Function to enable export buttons
function enableExportButtons() {
    if (exportPDF) {
        exportPDF.disabled = false;
        exportPDF.style.opacity = '1';
    }
    if (exportImage) {
        exportImage.disabled = false;
        exportImage.style.opacity = '1';
    }
}

// Function to disable export buttons
function disableExportButtons() {
    if (exportPDF) {
        exportPDF.disabled = true;
        exportPDF.style.opacity = '0.5';
    }
    if (exportImage) {
        exportImage.disabled = true;
        exportImage.style.opacity = '0.5';
    }
}

// Initialize the visualization
function initViz() {
    try {
        console.log('🚀 Initializing Tableau visualization...');
        
        if (!vizContainer) {
            throw new Error('Viz container not found');
        }
        
        if (typeof tableau === 'undefined') {
            throw new Error('Tableau API not loaded');
        }
        
        // Disable export buttons initially
        disableExportButtons();
        
        // Create the visualization
        viz = new tableau.Viz(vizContainer, url, options);
        
        console.log('✅ Visualization initialization started');
        
    } catch (error) {
        console.error('❌ Error initializing visualization:', error);
        showErrorMessage('Failed to load dashboard. Please refresh the page or check your internet connection.');
    }
}

// Show error message
function showErrorMessage(message) {
    if (vizContainer) {
        vizContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #e74c3c;">
                <h3>❌ Error Loading Dashboard</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    🔄 Refresh Page
                </button>
            </div>
        `;
    }
}

// Generate PDF export
function generatePDF() {
    try {
        if (viz) {
            viz.showExportPDFDialog();
            console.log('📄 PDF export dialog opened');
        } else {
            console.warn('⚠️ Visualization not ready for PDF export');
            alert('Please wait for the dashboard to load completely before exporting.');
        }
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
}

// Generate image export
function generateImage() {
    try {
        if (viz) {
            viz.showExportImageDialog();
            console.log('🖼️ Image export dialog opened');
        } else {
            console.warn('⚠️ Visualization not ready for image export');
            alert('Please wait for the dashboard to load completely before exporting.');
        }
    } catch (error) {
        console.error('❌ Error generating image:', error);
        alert('Failed to generate image. Please try again.');
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    console.log('📄 DOM loaded, initializing application...');
    
    // Initialize visualization
    initViz();
    
    // Add event listeners for export buttons
    if (exportPDF) {
        exportPDF.addEventListener("click", generatePDF);
        console.log('📄 PDF export button listener added');
    }
    
    if (exportImage) {
        exportImage.addEventListener("click", generateImage);
        console.log('🖼️ Image export button listener added');
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + P for PDF export
        if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
            event.preventDefault();
            generatePDF();
        }
        // Ctrl/Cmd + I for image export
        if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
            event.preventDefault();
            generateImage();
        }
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('📱 Page became visible, checking dashboard status...');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    console.log('📏 Window resized, dashboard should adapt automatically');
});

console.log('🎯 Netflix Visualization Dashboard script loaded successfully!');
