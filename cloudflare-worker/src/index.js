/**
 * Cloudflare Worker Proxy for Airtable
 * Secures the AIRTABLE_TOKEN and proxies requests for /events and /profiles.
 */

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0/appHwUzo4ARCQQlwr';

// CORS Headers for the proxy responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Check if the token is configured
    if (!env.AIRTABLE_TOKEN) {
      return new Response(JSON.stringify({ error: 'AIRTABLE_TOKEN is not configured in the worker environment.' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    let airtableUrl = '';

    // Route handling
    if (path === '/events') {
      airtableUrl = `${AIRTABLE_BASE_URL}/Events?view=Grid%20view`;
    } else if (path === '/profiles') {
      airtableUrl = `${AIRTABLE_BASE_URL}/Profiles?maxRecords=1000&view=Grid%20view`;
    } else {
      return new Response(JSON.stringify({ error: 'Endpoint not found.' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Forward any offset pagination parameters if present
    if (url.searchParams.has('offset')) {
      airtableUrl += `&offset=${url.searchParams.get('offset')}`;
    }

    try {
      const response = await fetch(airtableUrl, {
        headers: {
          'Authorization': `Bearer ${env.AIRTABLE_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  },
};
