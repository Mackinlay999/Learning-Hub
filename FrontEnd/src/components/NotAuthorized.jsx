import React from 'react';

const NotAuthorized = () => {
  return (
    <div style={styles.container}>
      <h1>403 - Not Authorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
};

export default NotAuthorized;
