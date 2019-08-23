-- Drop table if already exists
drop table if exists bookmarks;

-- Create table again
create table bookmarks (
    id VARCHAR(32) primary key,
    title VARCHAR(120) not null,
    url text not null,
    description text,
    rating integer not null
);

-- insert test data
insert into bookmarks (id, title, url, description, rating) values
    (
        'cjozyzcil0000lxygs3gyg2mr',
        'Thinkful',
        'https://www.thinkful.com',
        'Think outside the classroom',
        5
    ),
    (
        'cjozyzeqh0001lxygb8mhnvhz',
        'Google',
        'https://www.google.com',
        'Where we find everything else',
        4
    ),
    (
        'cjkzyzeqh0001lxygb8mhqvh3',
        'MDN',
        'https://developer.mozilla.org',
        'The only place to find web documentation',
        5
    ),
    (
        'cjz1toix7000304wvzo6af8ma',
        'Talent Acquisition Recruiter',
        'https://Google.com',
        'TESTTTTT',
        1
    ),
    (
        'cjz1vvbsy000404wvl46fv24x',
        'this',
        'https://is.com',
        'weird',
        1
    ),
    (
        'cjz1yg36j000504wvj3trusdr',
        'Zachs Yoga',
        'https://courses.thinkful.com/react-v1/checkpoint/14',
        'Its gooooood',
        5
    ),
    (
        'xjozyzcil0000lxygs3gyg2xr',
        'Thankful',
        'https://www.thankful.com',
        'Thank outside the classroom',
        2
    ),
    (
        'cjozyzexr8001lxygb8mhnvhz',
        'Giggle',
        'https://www.giggle.com',
        'Where we donot find everything else',
        3
    ),
    (
        'cjkzazeqh0201lxygb8mhqvh3',
        'MCN',
        'https://hello.org',
        'The only place',
        5
    ),
    (
        'cjz1toix7000304wvzo6pz8ma',
        'Segnoda',
        'https://fark.com',
        'TEST Description',
        4
    ),
    (
        'cjz1wwbsy000404wwl46fv24x',
        'this',
        'https://isnot.com',
        'well web site',
        1
    ),
    (
        'cjz1yg36j000504wvj3trusdz',
        'Zachs Hot Dogs',
        'https://hotdogs.com',
        'Its dogs',
        2
    );