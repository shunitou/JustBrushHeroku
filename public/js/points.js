// public/js/points.js
document.addEventListener('DOMContentLoaded', async function () {
    try {
      const userId = getUserId(); // Assuming you have a function to get the user ID
      const response = await fetch(`/points?userId=${userId}`);
      const data = await response.json();
      const userPointsElement = document.getElementById('userPoints');
      
      if (response.ok) {
        userPointsElement.textContent = `Your total points: ${data.userPoints}`;
      } else {
        userPointsElement.textContent = 'Failed to fetch points';
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  });
  
  function getUserId() {
    // This function should return the user ID from your authentication system
    // Replace this with your actual implementation
    return userId; // Assuming you have a variable named userId
  }
  