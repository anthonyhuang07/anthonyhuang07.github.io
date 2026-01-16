# anthonyhuang.net

My portfolio website, modelled after the pre-Liquid Glass iOS UI (Elements primarily copied from iOS 16 and iPadOS 17 screenshots). 

The homepage is based off the App Library; the different parts of my website are all designed after their respective apps.

<div>
  <img width="200" alt="CleanShot 2026-01-15 at 22 04 32" src="https://github.com/user-attachments/assets/6cd5b9e4-48bb-4ffa-92bd-c792c14e8ec6" />
  <img width="200" alt="CleanShot 2026-01-15 at 22 09 31" src="https://github.com/user-attachments/assets/8af45849-a295-45e0-a033-b12bc2e9c818" />
</div>

> L: Homepage (App Library)
> <br>R: Contact (Contacts App)


Tech Stack: 
- Front-end: HTML, SCSS, JavaScript
- Back-end: Express.js, Nginx

## Dynamic Island

<img width="372" height="203" alt="a" src="https://github.com/user-attachments/assets/7da66572-a4c7-4625-9984-97c502b58989" /><br>

A unique feature of this website is a replica of the iPhone's Dynamic Island. It works by my Discord bot posting my Apple Music status data to my self-hosted REST API.
- When I'm not listening to music, it displays my last played song in a paused state.
- When I'm listening to music, it displays what I'm currently listening to.
