export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;
    const params = url.search;
    
    // إزالة /api/v2 من المسار إذا وجدت (للتطبيقات التي تضيفها تلقائياً)
    if (path.startsWith('/api/v2/')) {
      path = path.replace('/api/v2', '');
    }
    
    // إذا كان المسار فارغاً، استخدم /platform/status كاختبار
    if (path === '/' || path === '') {
      path = '/platform/status';
    }
    
    const bfBase = 'https://api-pub.bitfinex.com/v2';
    const target = bfBase + path + params;
    
    const response = await fetch(target, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}
