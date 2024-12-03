Test using VSCode

1. Go to the HW4/3380HW4 Directory
2. Run 'npm install'
    - You may also have to install other packages
3. Create a dbs22 database in postgres
4. Change the passsword in server.js to your password
5. Change the IP address in Login.jsx and Order.jsx
    - If using WSL, use the IP from 'hostname -I'
6. If necessary, change any ports
    -By default, server runs on port 5000
7. In one terminal: start postgres server, run 'node server.js'
    -If using WSL, start postgres with 'sudo service postgresql start'
8. In a seperate terminal: run 'npm run dev'
9. The website should open locally

Note: For it to work on my local machine, the IP Address i had to set is from WSL. For your testing, it might need to be changed to Localhost or something else.