function SojuGlass({ isEmpty }: { isEmpty: string }) {
  return (
    <svg width="33" height="39" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 4C1.72708 4 1.46602 4.11155 1.27737 4.30877C1.08871 4.50599 0.988868 4.77175 1.00099 5.0444L2 5C1.00099 5.0444 1.00099 5.04453 1.001 5.04477L1.00105 5.0458L1.00123 5.0498L1.00193 5.06552L1.00471 5.12732L1.01568 5.36784C1.02536 5.57845 1.03972 5.88731 1.05849 6.28076C1.09601 7.06765 1.15112 8.19303 1.22152 9.54764C1.36229 12.2564 1.56428 15.8838 1.80903 19.5552C2.05361 23.2238 2.34161 26.9475 2.65494 29.8447C2.81134 31.2909 2.97591 32.549 3.14755 33.4975C3.23298 33.9696 3.32408 34.3874 3.42314 34.7221C3.47255 34.8891 3.5295 35.0546 3.59698 35.2045C3.6569 35.3376 3.75906 35.5369 3.92926 35.7071C4.1919 35.9697 4.54992 36.1088 4.79667 36.1905C5.08468 36.2859 5.42826 36.3663 5.80252 36.4361C6.55427 36.5763 7.52493 36.691 8.62497 36.7828C10.8307 36.9668 13.6415 37.0653 16.4458 37.0739C19.2497 37.0824 22.0706 37.0012 24.2958 36.8213C25.4054 36.7316 26.3895 36.6157 27.1573 36.4688C27.5399 36.3956 27.8926 36.3102 28.1904 36.2077C28.4545 36.1168 28.8079 35.9699 29.0707 35.7071C29.2362 35.5416 29.3414 35.3491 29.4078 35.2082C29.4802 35.0545 29.5417 34.8851 29.5952 34.7134C29.7022 34.3698 29.7996 33.9445 29.8901 33.4662C30.0719 32.5056 30.2427 31.2394 30.4024 29.7892C30.7224 26.8835 31.0062 23.1624 31.2422 19.5019C31.4785 15.8383 31.6677 12.2232 31.7978 9.52473C31.8629 8.17527 31.9132 7.05453 31.9473 6.27097C31.9643 5.87917 31.9773 5.57165 31.986 5.36195L31.9959 5.12246L31.9984 5.0609L31.999 5.04523L31.9991 5.04124L31.9992 5.04022C31.9992 5.03997 31.9992 5.03984 31 5L31.9992 5.03984C32.01 4.76793 31.9096 4.50334 31.7211 4.30712C31.5325 4.1109 31.2721 4 31 4H2Z"
        fill="white"
        stroke="#181818"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <mask
        id="mask0_359_633"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="6"
        width="29"
        height="30"
      >
        <path
          d="M2 6H31C31 6 29.8636 33.5145 28.3636 34.9627C26.8636 36.4108 6 36.2792 4.63636 34.9627C3.27273 33.6462 2 6 2 6Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_359_633)">
        <path
          d="M2 11H31C31 11 29.8636 34.8459 28.3636 36.101C26.8636 37.356 6 37.2419 4.63636 36.101C3.27273 34.96 2 11 2 11Z"
          fill="#B2E0FA"
          className={`${!!isEmpty ? "scale-y-100" : "scale-y-0"} origin-bottom ease-in-out duration-1000`}
        />
      </g>
      <path
        d="M8 13L9 29M24 29L25 13M16 13V29"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M31.2061 3.31062C31.9076 3.71269 31.9892 3.96977 31.9987 4C31.9892 4.03023 31.9076 4.28731 31.2061 4.68938C30.4885 5.10066 29.3837 5.50456 27.9317 5.85658C25.0432 6.55681 21.001 7 16.5 7C11.999 7 7.9568 6.55681 5.06834 5.85658C3.61627 5.50456 2.51148 5.10066 1.79392 4.68938C1.0924 4.2873 1.01075 4.03023 1.00125 4C1.01075 3.96977 1.0924 3.7127 1.79392 3.31062C2.51148 2.89934 3.61627 2.49544 5.06834 2.14342C7.9568 1.44319 11.999 1 16.5 1C21.001 1 25.0432 1.44319 27.9317 2.14342C29.3837 2.49544 30.4885 2.89934 31.2061 3.31062Z"
        fill="white"
        stroke="#181818"
        strokeWidth="2"
      />
    </svg>
  );
}

export default SojuGlass;