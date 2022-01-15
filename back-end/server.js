const app = require('./src/app');
// process.env.PORT || 
const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
