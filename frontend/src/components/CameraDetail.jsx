import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCameraSnapshot } from '../api/camera.js';

export default function CameraDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getCameraSnapshot(id);
      setData(snapshot);
    }
    fetchData();
  }, [id]);

  if (!data) return <p>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chi tiết Camera {id}</h2>
      <img src={data.image_url} width="600" alt="Hiện tại" />
      <p><strong>Mật độ hiện tại:</strong> {data.density}</p>
      {/* Tại đây bạn có thể thêm biểu đồ lịch sử, mật độ dự đoán,... */}
    </div>
  );
}