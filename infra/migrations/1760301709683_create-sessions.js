exports.up = (pgm) => {
  pgm.createTable("sessions", {
    id: {
      type: `uuid`,
      primaryKey: true,
      default: pgm.func(`gen_random_uuid()`),
    },
    token: {
      type: `varchar(96)`,
      notNull: true,
      unique: true,
    },
    user_id: {
      type: `uuid`,
      notNull: true,
      // https://github.com/github/gh-ost/issues/331#issuecomment-266027731
      // refereces: "users"
    },
    expires_at: {
      type: `timestamptz`,
      notNull: true,
    },
    created_at: {
      type: `timestamptz`,
      notNull: true,
      default: pgm.func(`timezone('utc', now())`),
    },
    updated_at: {
      type: `timestamptz`,
      notNull: true,
      default: pgm.func(`timezone('utc', now())`),
    },
  });
};

exports.down = () => false;
