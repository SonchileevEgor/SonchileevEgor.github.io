function countdown(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const targetDate = "2025-07-12T16:00:00";
  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  Object.values(elements).forEach((element) => {
    element.classList.add("wedding-time-fade");
  });

  setInterval(() => {
    const result = countdown(targetDate);

    Object.keys(elements).forEach((key) => {
      const element = elements[key];
      const newValue = result[key];

      if (element.textContent !== newValue.toString()) {
        element.classList.remove("wedding-timer-visible");
        setTimeout(() => {
          element.textContent = newValue;
          element.classList.add("wedding-timer-visible");
        }, 500);
      }
    });
  }, 1000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
});
