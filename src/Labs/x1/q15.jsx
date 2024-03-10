function Dsaq15() {
    const q = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <ul>
        {q.map((s) => (
          <li key={s}>
            2 x {s} = {2 * s}
          </li>
        ))}
      </ul>
    );
  }
  export default Dsaq15;