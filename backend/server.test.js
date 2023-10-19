const request = require('supertest');
const app = require('./server');


describe('Server Routes', () => {
  
  it('should serve the frontend build', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('should fetch country data for Japan', async () => {
    const res = await request(app).post('/home_list').query({ country: 'Japan' });
    expect(res.status).toBe(200);
    expect(res.body.data.cca2).toBe('JP');
    expect(res.body.data.capital[0]).toBe('Tokyo');
    expect(res.body.data.flag).toBe("🇯🇵");
  });

  it('should fetch country data for France', async () => {
    const res = await request(app).post('/home_list').query({ country: 'France' });
    
    expect(res.status).toBe(200);
    expect(res.body.data.cca2).toBe('FR');
    expect(res.body.data.capital[0]).toBe('Paris');
  });



  it('should require a country name', async () => {
    const res = await request(app).post('/home_list');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Country name is required');
  });

  it('should handle non-existing country', async () => {
    const res = await request(app).post('/home_list').query({ country: 'InvalidCountry' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(40400);
    expect(res.body.message).toBe('No information available for the given country name.');
  });


  it('should serve static assets', async () => {
    const res = await request(app).get('/static/js/main.js'); // Adjust the path to an actual static asset in your build
    expect(res.status).toBe(200);
  });


  it('should handle invalid query parameters', async () => {
    const res = await request(app).post('/home_list').query({ invalidParam: 'Japan' });
    
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Country name is required');
  }); 


    it('should allow CORS', async () => {
        const res = await request(app).post('/home_list').query({ country: 'Japan' });
    
        expect(res.header['access-control-allow-origin']).toBe('*');  // Adjust if you have specified origins.
    });



});
