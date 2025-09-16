// استيراد الوحدات الأساسية: http لقراءة الطلبات و fs لقراءة الملفات
const http = require('http');
const fs = require('fs');
const path = require('path');

// تحديد اسم المضيف (hostname) والمنفذ (port)
const hostname = '127.0.0.1'; // الخادم المحلي
const port = 3000;

// إنشاء خادم
const server = http.createServer((req, res) => {
  // بناء المسار الكامل للملف المطلوب.
  // إذا كان المسار هو '/'، فسيتم عرض ملف index.html
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // قراءة الملف المطلوب
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // إذا حدث خطأ (مثلاً، الملف غير موجود)، أرسل خطأ 404
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found\n');
      return;
    }

    // تحديد نوع المحتوى (MIME type) لإخبار المتصفح بنوع الملف
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
    }[extname] || 'application/octet-stream';

    // إرسال الملف إلى المتصفح
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data, 'utf-8');
  });
});

// تشغيل الخادم
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});