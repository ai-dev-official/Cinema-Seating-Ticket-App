const mainHall = document.querySelector('.main_hall');
const seats = document.querySelectorAll('.seat_row .seat:not(.booked)');
const numSeats = document.getElementById('num_seats');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
populateUI();

let ticketPrice = +movieSelect.value;

// Save selected Movie and Price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and num_seats

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.seat_row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  /* const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  }); */

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  numSeats.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

mainHall.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat' && !e.target.classList.contains('booked')));
  e.target.classList.toggle('selected');

  updateSelectedCount();

});

updateSelectedCount();