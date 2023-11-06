type PersonEmpty = { name: string; sum: number };

const calcPeople: (persons: PersonEmpty[]) => string = (p) => {
  type Debt = { name: string; debt: number };
  type Person = { name: string; balance: number; debts: Debt[] }[];
  let result: string = '';
  let sum: number = 0;
  let receivers: Person[] = [];
  let debtors: Person[] = [];
  let avg: number;

  const create: (pers: PersonEmpty, bal: number) => Person = (p, b) => {
    return [
      {
        name: p.name,
        balance: b,
        debts: [],
      },
    ];
  };

  p.map((person) => (sum += person.sum));
  avg = sum / p.length;

  p.map((person) => {
    let balance: number = avg - person.sum;
    if (balance > 0) {
      receivers.push(create(person, balance));
    } else {
      debtors.push(create(person, balance));
    }
  });

  for (let r = 0; r < receivers.length; r++) {
    for (let d = 0; d < debtors.length; d++) {
      if (debtors[d][0].balance === 0 || receivers[r][0].balance === 0) {
        continue;
      } else {
        if (debtors[d][0].balance + receivers[r][0].balance < 0) {
          debtors[d][0].debts.push({
            name: receivers[r][0].name,
            debt: debtors[d][0].balance,
          });
          receivers[r][0].balance += debtors[d][0].balance;
          debtors[d][0].balance = 0;
        } else {
          debtors[d][0].debts.push({
            name: receivers[r][0].name,
            debt: Math.abs(receivers[r][0].balance),
          });
          debtors[d][0].balance += receivers[r][0].balance;
          receivers[r][0].balance = 0;
        }
      }
    }
  }

  if (debtors.length === 0) {
    result = 'Никто никому ничего не должен или вы ввели некорректный запрос';
  } else {
    debtors.map((debtor) => {
      if (debtor[0].debts.length === 0) return;
      result += debtor[0].name + ", Вы должны ";
      debtor[0].debts.map((debt) => {
        result +=
          'персоне ' + debt.name + ' ' + debt.debt.toFixed(1) + ' ₽.\n';
      });
    });
  }
  return result;
};

export {calcPeople, PersonEmpty}


