export const permissions = [
  {
    title: 'stuff1',
    name: 'Стажер',
    allowedPages: [
      'info', 'search_uuid', 'online', 'mutes'
    ]
  },
  {
    title: 'stuff2',
    name: 'Хелпер',
    allowedPages: [
      'onlineNames'
    ]
  },
  {
    title: 'stuff3',
    name: 'Мл.модер',
    allowedPages: [
      'bans', 'reg'
    ]
  },
  {
    title: 'stuff4',
    name: 'Модер',
  },
  {
    title: 'stuff5',
    name: 'Мл.админ',
    allowedPages: [
      'uuid', 'last', 'bans_history', 'mutes_history', 'mult'
    ]
  },
  {
    title: 'stuff6',
    name: 'Админ',
  },
  {
    title: 'stuff7',
    allowedPages: [
      'ip', 'bansadm', 'muteadm', 'staff7Buttons', 'mscreen', 'perms', 'tpspawn', 'clear', 'tps', 'email', 'logs'
    ],
    name: 'Упр',
  },
  {
    title: 'stuff10',
    allowedPages: [
      'all'
    ],
    name: 'Психолог',
  },
  {
    title: 'stuff11',
    allowedPages: [
      'all'
    ],
    name: 'Контролер',
  },
  {
    title: 'stuff12',
    allowedPages: [
      'all'
    ],
    name: 'Проверяющий',
  },
  {
    title: 'stuff13',
    allowedPages: [
      'all'
    ],
    name: 'Разработчик',
  }
]

function mixPermissions(stuff) {
  let arr = [];
  const index = permissions.findIndex( item => {
    return item.title === stuff;
  })

  if (index !== -1) {
    if (index === 0) {
      return permissions[index].allowedPages;
    }

    for (let i = 0; i <= index; i++) {
      arr = arr.concat( permissions[i].allowedPages );
    }

    return arr;
  }

  return false;
}

export function getStaffPermissions(stuff) {
  return mixPermissions(stuff) ? mixPermissions(stuff) : false;
}
