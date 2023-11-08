type PersonEmpty = { name: string; sum: number };

const calcPeople: (persons: PersonEmpty[]) => string = (p) => {
  type Person = { name: string; balance: number; debts: Debt[] };
  type Debt = { name: string; debt: number };

  // Создаем объекты Person на основе входных данных
  const persons: Person[] = p.map((person) => ({ name: person.name, balance: person.sum, debts: [] }));

  // Рассчитываем общий баланс
  const totalBalance = persons.reduce((total, person) => total + person.balance, 0);

  // Рассчитываем средний баланс
  const avg = totalBalance / persons.length;

  // Определяем долги и кредиты
  for (let i = 0; i < persons.length; i++) {
    for (let j = 0; j < persons.length; j++) {
      if (i !== j) {
        const debtor = persons[i];
        const creditor = persons[j];
        if (debtor.balance < avg && creditor.balance > avg) {
          const debtAmount = avg - debtor.balance;
          debtor.debts.push({ name: creditor.name, debt: debtAmount });
          creditor.balance -= debtAmount;
          debtor.balance += debtAmount;
        }
      }
    }
  }

  let result: string = '';

  for (let i = 0; i < persons.length; i++) {
    const person = persons[i];
    if (person.debts.length > 0) {
      result += `${person.name}, вы должны:\n`;
      person.debts.forEach((debt) => {
        result += `персоне ${debt.name} ${debt.debt.toFixed(1)} ₽.\n`;
      });
    }
  }

  if (result === '') {
    result = 'Никто никому ничего не должен или вы ввели некорректный запрос';
  }

  return result;
};

export {calcPeople, PersonEmpty}


