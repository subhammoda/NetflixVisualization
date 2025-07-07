console.log('Netflix Visualization Dashboard - Loading...');

let viz;
let workbook;
let activeSheet;

// Tableau Public dashboard URL
const url = "https://public.tableau.com/views/NetflixVisualization_17247273581690/Netflix?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

// Get DOM elements
const vizContainer = document.getElementById('vizContainer');

// Tableau visualization options
const options = {
    hideTabs: true,
    height: 1000,
    width: 1600,
    onFirstInteraction: function () {
        try {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
            console.log("✅ Dashboard is interactive and ready!");
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

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    console.log('📄 DOM loaded, initializing application...');
    
    // Initialize visualization
    initViz();
    
    // Add keyboard shortcuts (if needed for future features)
    document.addEventListener('keydown', function(event) {
        // Reserved for future shortcuts
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
