import miniAvatar from '../assets/images/avatar.png';
import aeStudioLogo from '../assets/images/logos/ae-studio.png';
import trimbleLogo from '../assets/images/logos/trimble.svg';
import pdv365Logo from '../assets/images/logos/pdv365.jpg';

export const dude = {
  avatar: {
    mini: miniAvatar,
  },
  nav: [
    // {
    //   label: 'About',
    //   path: '/about'
    // },
    {
      label: 'Articles',
      path: '/articles'
    },
    {
      label: 'Projects',
      path: '/projects'
    },
    {
      label: 'Tools',
      path: '/tools'
    },
  ],
  social: {
    instagram: 'https://www.instagram.com/regibytes/',
    linkedin: 'https://www.linkedin.com/in/regibyte/',
    github: 'https://github.com/RegiByte',
  },
  home: {
    titles: 'Software developer, 3d artist, mentor.',
    bio: `I’m Reginaldo, a web developer, game dev and 3d illustrator based in Londrina
          City, Brazil. I’ve been working with development since I was 13 years old, now with more than 
          ${(new Date().getFullYear()) - 2014} years of experience, I have created dozens of projects that 
          are used by thousands of people in U.S and Brazil.
        `,
    photos: [
      'https://via.placeholder.com/256',
      'https://via.placeholder.com/256',
      'https://via.placeholder.com/256',
      'https://via.placeholder.com/256',
      'https://via.placeholder.com/256',
    ],
    resume: [
      {
        company: 'AE Studio',
        title: 'Senior Full-Stack Dev',
        logo: aeStudioLogo,
        start: '2022',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear(),
        },
      },
      {
        company: 'Trimble Transportation',
        title: 'Senior Backend Dev',
        logo: trimbleLogo,
        start: '2020',
        end: '2022',
      },
      {
        company: 'PDV 365',
        title: 'React Dev',
        logo: pdv365Logo,
        start: '2019',
        end: '2020',
      },
    ],
  },
};