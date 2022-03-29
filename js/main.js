window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then( () => {
        console.info('Service Worker Registered');
      });
    }

    let deferredPrompt;
    const addButton = document.querySelector('#buttonInstall');
    addButton.style.display ='none';
    
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen 
      addButton.style.display = 'block';

      addButton.addEventListener('click', () => {
        addButton.style.display = 'none'; // hide our user interface that shows our A2HS button
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted')
            console.info('User accepted the A2HS prompt');
          else 
            console.info('User dismissed the A2HS prompt');

          deferredPrompt = null;
        });

      });
    });

    location.replace("http://localhost:8000/imsM72");
}