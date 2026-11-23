import type { GalleryItem } from './types';

/**
 * Real Protege Schools photos and video, stored in /public.
 * Add new ones here: drop the file in /public/images/gallery (or /public/media for video)
 * and add an entry below. width/height are the image's pixel size and keep the gallery from jumping while it loads.
 */
const img = (file: string) => `/images/gallery/${file}`;

export const media = {
  hero: img('mural-pupils.jpg'),
  heroSmall: img('graduation.jpg'),
  school_sign: img('school-sign.jpg'),
  lab_video: '/media/science-lab.mp4',
  lab_poster: img('science-lab-poster.jpg'),
};

export const schoolMoments: GalleryItem[] = [
  { id: 'local-lab-video', title: 'Science practical', description: 'Pupils carry out a hands-on experiment in the laboratory.', category: 'Classroom', image_url: media.lab_poster, video_url: media.lab_video, width: 360, height: 640 },
  { id: 'local-graduation', title: 'Graduation and awards day', description: 'Graduands celebrate at the annual awarding and graduation ceremony.', category: 'Events', image_url: img('graduation.jpg'), width: 960, height: 1280 },
  { id: 'local-computer-lab', title: 'Computer lab', description: 'Hands-on ICT practice, with teachers guiding every step.', category: 'Classroom', image_url: img('computer-lab.jpg'), width: 1080, height: 1080 },
  { id: 'local-mural', title: 'Colour and culture', description: 'Pupils pose in front of a painted portrait in traditional dress.', category: 'Events', image_url: img('mural-pupils.jpg'), width: 607, height: 1080 },
  { id: 'local-finalist-sss1', title: 'National finalist, SSS 1', description: 'Chosen as a Lagos State national finalist at the 17th Spelling Leaders Competition.', category: 'Competitions', image_url: img('finalist-sss1.jpg'), width: 1080, height: 1080 },
  { id: 'local-quiz', title: 'Mid-term quiz winners', description: 'Joint winners of the mid-term quiz with their prizes.', category: 'Competitions', image_url: img('quiz-winners.jpg'), width: 1280, height: 960 },
  { id: 'local-music', title: 'Music lesson', description: 'Pupils learn to play melodies on the keyboard.', category: 'Classroom', image_url: img('music-lesson.jpg'), width: 1080, height: 630 },
  { id: 'local-contestant', title: 'Ready to spell', description: 'A pupil with her contestant badge at the Spell Africa competition.', category: 'Competitions', image_url: img('spelling-contestant.jpg'), width: 611, height: 1080 },
  { id: 'local-medals', title: 'Medals and smiles', description: 'Pupils celebrate with medals beside the Spell Africa banner.', category: 'Competitions', image_url: img('spelling-medals.jpg'), width: 1080, height: 810 },
  { id: 'local-finalist-jss2', title: 'National finalist, JSS 2', description: 'Chosen as a Lagos State national finalist at the 17th Spelling Leaders Competition.', category: 'Competitions', image_url: img('finalist-jss2.jpg'), width: 1080, height: 1080 },
  { id: 'local-backpacks', title: 'Backpacks and books', description: 'Pupils with new school bags and books from Street Kid Africa.', category: 'Community', image_url: img('backpacks-books.jpg'), width: 1080, height: 1080 },
  { id: 'local-banner', title: 'Bright and bold', description: 'Pupils gather in front of a colourful banner at a school event.', category: 'Events', image_url: img('colour-banner-pupils.jpg'), width: 607, height: 1080 },
  { id: 'local-compound', title: 'Pupils and staff together', description: 'The school community gathers in the compound.', category: 'Community', image_url: img('compound-group.jpg'), width: 1280, height: 960 },
  { id: 'local-contestants', title: 'Spelling contestants', description: 'Contestants at the Spelling Leaders Competition.', category: 'Competitions', image_url: img('spelling-contestants.jpg'), width: 1080, height: 1080 },
  { id: 'local-sign', title: 'Welcome to Protege', description: 'The sign at our school entrance.', category: 'Our school', image_url: img('school-sign.jpg'), width: 960, height: 501 },
  { id: 'local-finalist-basic5', title: 'National finalist, Basic 5', description: 'Chosen as a Lagos State national finalist at the 17th Spelling Leaders Competition.', category: 'Competitions', image_url: img('finalist-basic5.jpg'), width: 1080, height: 1080 },
  { id: 'local-contest', title: 'A lively contest', description: 'Classmates gather around the table for an in-school challenge.', category: 'Activities', image_url: img('contest-day.jpg'), width: 1080, height: 599 },
  { id: 'local-winners', title: 'Winners with their prize', description: 'A winning team shows off its prize box after the contest.', category: 'Activities', image_url: img('winners-prize.jpg'), width: 1080, height: 603 },
  { id: 'local-garden', title: 'In the school garden', description: 'Bougainvillea in bloom at the school.', category: 'Our school', image_url: img('bougainvillea.jpg'), width: 960, height: 1280 },
  { id: 'local-wide', title: 'The whole school family', description: 'Pupils and staff gather in the school compound.', category: 'Community', image_url: img('compound-wide.jpg'), width: 1280, height: 960 },
];
