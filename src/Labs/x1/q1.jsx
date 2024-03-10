function Fds() {
    const u = [1, 9, 3, 8, 6, 5, 7, 4, 2];
    return (
      <ul>
        {u.filter((f) => f > 5)
          .map((s) => (
            <li>{s}</li>
          ))}
      </ul>
    );
  }
  export default Fds;