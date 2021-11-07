const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const message = document.querySelector('.message');

const login = (user) => {
  buttonAuth.style.display = 'none';

  buttonOut.style.display = 'flex';
  userName.style.display = 'block';

  userName.textContent = user.login;
  modalAuth.style.display = 'none';

  localStorage.setItem('user', JSON.stringify(user));
}

const logout = () => {
  buttonAuth.style.display = 'flex';

  buttonOut.style.display = 'none';
  userName.style.display = 'none';
  userName.textContent = '';

  localStorage.removeItem('user');
  window.location.href = '/';
}

buttonAuth.addEventListener('click', () => {
  modalAuth.style.display = 'flex';
});

modalAuth.addEventListener('click', e => {
  const target = e.target;
  if (!target.closest('.modal-dialog') || target === closeAuth){
    modalAuth.style.display = 'none';
    logInForm.reset();
  }
});

buttonOut.addEventListener('click', () => {
  logout();
})

logInForm.addEventListener('submit', e => {
  e.preventDefault();
  const err = [];
  const user = {
    login: inputLogin.value,
    password: inputPassword.value
  };
  if (!inputLogin.value){
    err.push('Введите логин');
  }
  if (!inputPassword.value){
    err.push('Введите пароль');
  }

  if (!err.length){
    login(user);
  } else {
    message.innerHTML = err.join('<br>');
  }
});

if (localStorage.getItem('user')){
  login(JSON.parse(localStorage.getItem('user')));
  console.log(localStorage.getItem('user'));
}