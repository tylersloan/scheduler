This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment

I reached for nextjs, thinking it would provide me everything I needed to host dynamic data (if I got to that) and routing and an easy deployment option (which I didn't utilize). I used Material UI to skip styling everything by hand and left it just as it comes.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Clicking around

The landing page/dashboard has a list of providers and a client. Clicking a provider will navigate you to the `providers/{id}` route and show you the one and only thing a provider cna do in this app–edit their availability. There are some comments that show great ambition to allow these changes to actually persist. 😏

If you click on the client, you will land on their personal dashboard which is just a list of appointments they already have. I had high hopes of visually indicating past appointments, appointments that got cancelled due to non-confirmation, etc. What you can do on this page though is click a button to navigate to the `make-reservation` page. There's a form with a dropdown for all Providers, a date selector, and a dynamic list of available time slots for that provider on that day. The slots are filtered based on the provider's existing appointments and are at least 24-hours out from "now". I followed MUI's lead here and used dayjs, new to me. At one point I felt like this whole project was testing how I was able deal with time in JavaScript 😅

## Prep

I spent a lot of the first day I had to just think through the app. I jotted down the basics and some stretch goals, and thought of how data would be design and how the user flow might work. I knew straight away there was too much to do to get the basics and add nice-to-haves. I wasn't sure how to lay this stuff out to work on a mobile device, so looked around a bit and figured out some basic design to get the job done.
<img width="1085" alt="image" src="https://github.com/tylersloan/scheduler/assets/3633879/e0c60e37-18c9-46cc-b640-792d00826efd">
<img width="1090" alt="image" src="https://github.com/tylersloan/scheduler/assets/3633879/e483dd5f-a84a-4840-9167-19423e1ec534">
<img width="1088" alt="image" src="https://github.com/tylersloan/scheduler/assets/3633879/028025e2-bbad-49bd-848c-6f1a395dddc4">
<img width="969" alt="image" src="https://github.com/tylersloan/scheduler/assets/3633879/b172edaf-2817-4cba-982f-2976cb24e402">
<img width="944" alt="image" src="https://github.com/tylersloan/scheduler/assets/3633879/b5dd4251-1b8c-43b0-8ae2-4322f5a84edf">
<img width="1063" alt="image" src="https://github.com/tylersloan/scheduler/assets/3633879/6b3a4f50-1137-4e8e-9174-e758b599be10">

## I tried express and then tried route.ts (next)

I wanted the data to be real and editable. I've never used nextjs much, and figured an express server would do well. But by the time I got it working I thought "I should have just used what's built in." so I tried that too. This took time (that I didn't count against me). Ultimately I ran into too many hurdles to force it. I left some remnants of code that look like there was an attempt, but I ended up using the endpoints/service funcs to just return to me the hard-coded provider and clients arrays.


## Reality Check 😬

This was bigger than I even imagined. So much to do, so little time. SO many cool things to think about too that just had to be ignored, as far as UX and user flow goes.
The data schema was something I battled with too, specifically around handling time slots for providers and users. I ended up using a TIME_SLOTS array that's quite verbose but it seemed the best way to get something working fast. But dealing with turning that into 12-hour time with am/pm attached, and using it in multiple places I was sure I probably needed a smarter mapping system so the code could be/feel less hacky. There are no hacks, actually, but a bit more explicitness than I'd prefer.

## To-Dos
- Log in & Sign up
- Working "backend" / persistent data
- Think about time zones? (standardized on servers)
- Add ability to add and remove multiple working blocks per day for Providers (now there can only be one)
- Ability for provider to set custom schedule on specific days
- Ability to bulk set schedule for "weekdays", etc
- Providers page to see all Providers (and more details?) without being on the scheduling screen
- Prevent from trying to scheduling in the past
- Save the appointment
- Communicate to user they need to confirm appointment (maybe text/email service, but also upon inital booking)
- Cancel appointment if not confirmed within time limit
- Dynamic menu items based on role of who is signed in
- Write tests
- ...?
- Make it look nice
