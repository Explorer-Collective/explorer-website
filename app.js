(() => {
  const products = [
    {
      id: 'information-radar',
      type: '当前实践',
      name: '信息雷达',
      alias: 'InformationRadar',
      facts: [
        ['面向', '个人、一人公司、小团队与企业'],
        ['关注', '信息过载、变化原因与行动判断'],
        ['正在探索', '从外部信号到可验证下一步的分析路径']
      ],
      capabilityTitle: '信息雷达能做什么',
      summary: [['信息雷达正在解决一个具体问题：', '信息太多、资源有限时，个人和小团队该先做什么？'], ['它会把事实、限制和仍需确认的部分拆开，', '再找一个值得先试的方向。']],
      details: ['它不只告诉你发生了什么，还会解释变化背后的原因、可能影响谁，以及它与你当前目标和现实条件有什么关系。', '最后留下的不是一句泛泛的建议，而是一个值得先试、可以继续验证的下一步。', '信息雷达是探索者现在正在做的事，但探索者不只做这一件事。'],
      cta: '看它怎样理解一条信号',
      status: '当前实践',
      workflowEyebrow: 'INFORMATIONRADAR · HOW IT WORKS',
      workflowTitle: '外部信号，怎样变成与你有关的判断。',
      workflowTitleParts: ['外部信号，', '怎样变成', '与你有关的判断。'],
      workflowDescription: '它不替你下结论，而是把发生了什么、为什么发生、会影响谁，以及下一步如何验证放回同一个阅读顺序。',
      workflowSteps: [
        { label: '信号', description: ['发生了什么？', '这是一次短期波动，还是值得持续关注的信号？'] },
        { label: '来源', description: ['信息从哪里来？', '发布时间是什么时候？来源是否可追溯？不同来源之间是否一致，可信程度如何？'] },
        { label: '原因', description: ['是什么推动了变化？', '从政策、成本、技术、供需到产业结构，哪些宏观因素正在作用，又如何传导到具体行业与个体？'] },
        { label: '影响', description: ['哪些行业和人群会先受到影响？', '影响会发生在哪个环节，又会通过什么方式出现？'] },
        { label: '相关度', description: ['这条变化与你有多大关系？', '结合目标、资源、时间、风险与现实限制，判断它是否真正与你、你的团队或企业有关。'] },
        { label: '可验证的下一步', description: ['下一步怎样验证？', '给出一个成本可承担、能够马上开始的小验证方案，并明确继续、停止或调整的判断条件。'] }
      ],
      workflowBoundary: ''
    }
  ];

  let activeProductId = products[0].id;
  const bySelector = selector => document.querySelector(selector);
  const byData = name => [...document.querySelectorAll(`[data-product="${name}"]`)];
  const byPreview = name => bySelector(`[data-preview="${name}"]`);

  const setParagraphs = (element, lines, className = '') => {
    element.replaceChildren(...lines.map(line => {
      const paragraph = document.createElement('p');
      if (className) paragraph.className = className;
      if (Array.isArray(line)) {
        line.forEach(segment => {
          const span = document.createElement('span');
          span.className = 'copy-line';
          span.textContent = segment;
          paragraph.append(span);
        });
      } else {
        paragraph.textContent = line;
      }
      return paragraph;
    }));
  };

  const renderProduct = () => {
    const index = products.findIndex(product => product.id === activeProductId);
    const product = products[index];
    byData('name').forEach(element => { element.textContent = product.name; });
    byData('alias').forEach(element => { element.textContent = product.alias; });
    byData('capability-label').forEach(element => { element.textContent = product.capabilityTitle; });
    setParagraphs(byData('description')[0], product.summary, 'practice-copy-core');
    setParagraphs(byData('details')[0], product.details);

    const facts = byData('facts')[0];
    facts.replaceChildren(...product.facts.map(([term, definition]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = term;
      dd.textContent = definition;
      row.append(dt, dd);
      return row;
    }));

    const cta = byData('cta')[0];
    cta.replaceChildren(document.createTextNode(`${product.cta} `));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↓';
    cta.append(arrow);

    byData('status')[0].textContent = `${product.status} ${index + 1} / ${products.length}：${product.name}`;
    byPreview('section-title').textContent = `${product.name}如何工作`;
    byPreview('eyebrow').textContent = product.workflowEyebrow;
    const previewTitle = byPreview('title');
    previewTitle.replaceChildren(...product.workflowTitleParts.flatMap((part, index) => {
      const span = document.createElement('span');
      span.textContent = part;
      return index === product.workflowTitleParts.length - 1 ? [span] : [span, document.createTextNode(' ')];
    }));
    byPreview('description').textContent = product.workflowDescription;
    byPreview('boundary').textContent = product.workflowBoundary;

    const buildWorkflowCell = (step, rowIndex) => {
      const cell = document.createElement('td');
      const label = document.createElement('span');
      const description = document.createElement('div');
      cell.className = 'workflow-cell';
      label.className = 'workflow-cell__label';
      description.className = 'workflow-cell__description';
      label.textContent = step.label;
      step.description.forEach((line, index) => {
        const paragraph = document.createElement('p');
        paragraph.className = index === 0 ? 'workflow-cell__question' : 'workflow-cell__example';
        paragraph.textContent = line;
        description.append(paragraph);
      });
      cell.append(label, description);
      if (rowIndex < 2) {
        const connector = document.createElement('span');
        connector.className = 'workflow-connector';
        connector.setAttribute('aria-hidden', 'true');
        connector.textContent = '↓';
        cell.append(connector);
      }
      return cell;
    };

    const buildWorkflowRow = rowIndex => {
      const row = document.createElement('tr');
      row.className = 'workflow-row';
      row.append(
        buildWorkflowCell(product.workflowSteps[rowIndex], rowIndex),
        buildWorkflowCell(product.workflowSteps[rowIndex + 3], rowIndex)
      );
      return row;
    };
    byPreview('fields').replaceChildren(...[0, 1, 2].map(buildWorkflowRow));

    const previous = bySelector('[data-product-control="previous"]');
    const next = bySelector('[data-product-control="next"]');
    const controls = bySelector('.product-controls');
    if (previous && next && controls) {
      const onlyProduct = products.length < 2;
      previous.disabled = onlyProduct;
      next.disabled = onlyProduct;
      controls.hidden = onlyProduct;
    }
  };

  const moveProduct = direction => {
    const currentIndex = products.findIndex(product => product.id === activeProductId);
    const nextIndex = (currentIndex + direction + products.length) % products.length;
    activeProductId = products[nextIndex].id;
    renderProduct();
  };

  const previousBtn = bySelector('[data-product-control="previous"]');
  const nextBtn = bySelector('[data-product-control="next"]');
  if (previousBtn) previousBtn.addEventListener('click', () => moveProduct(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveProduct(1));
  renderProduct();

  const form = bySelector('#question-form');
  const status = bySelector('#form-status');
  const contextField = bySelector('#context');
  const contextCount = bySelector('#context-count');
  if (form && status && contextField && contextCount) {
    const updateContextCount = () => {
      contextCount.textContent = `${contextField.value.length} / 4000`;
    };
    contextField.addEventListener('input', updateContextCount);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const contact = form.elements.contact.value.trim();
      const summary = form.elements.summary.value.trim();
      const context = form.elements.context.value.trim();
      if (!name || !contact || !summary || !context) {
        status.textContent = '请先完成称呼、联系方式、探索内容和问题详情四个必填项。';
        return;
      }
      status.textContent = '已提交。你的内容不会被发送、保存或同步。';
      form.reset();
      updateContextCount();
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeScrollFrame = 0;
  const easeInOutCubic = progress => progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const target = hash && hash.length > 1 ? document.querySelector(hash) : null;
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', hash);
      const start = window.scrollY;
      const destination = Math.max(0, target.getBoundingClientRect().top + start - 18);
      const distance = destination - start;
      if (reducedMotion || Math.abs(distance) < 2) {
        window.scrollTo(0, destination);
        return;
      }
      if (activeScrollFrame) cancelAnimationFrame(activeScrollFrame);
      const duration = Math.min(760, Math.max(420, Math.abs(distance) * 0.08));
      const startedAt = performance.now();
      const step = now => {
        const progress = Math.min(1, (now - startedAt) / duration);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) activeScrollFrame = requestAnimationFrame(step);
        else activeScrollFrame = 0;
      };
      activeScrollFrame = requestAnimationFrame(step);
    });
  });

  // 全局排版上限：视口超过设计基准 1240px 时锁定 vw-based 尺寸
  const LAYOUT_CAP_WIDTH = 1240;
  const applyLayoutCap = () => {
    document.documentElement.classList.toggle('layout-capped', window.innerWidth >= LAYOUT_CAP_WIDTH);
  };
  window.addEventListener('resize', applyLayoutCap, { passive: true });
  applyLayoutCap();

  const revealTargets = [...document.querySelectorAll('main > section, footer')];
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    revealTargets.forEach(element => element.classList.add('reveal-section'));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
  }

  document.querySelectorAll('.faq details').forEach(details => {
    const summary = details.querySelector('summary');
    const answer = details.querySelector('.faq-answer');
    let closing = false;
    summary.addEventListener('click', event => {
      event.preventDefault();
      if (closing) return;
      if (!details.open) {
        details.open = true;
        if (reducedMotion) return;
        answer.animate(
          [{ height: '0px', opacity: 0, transform: 'translateY(-6px)' }, { height: `${answer.scrollHeight}px`, opacity: 1, transform: 'translateY(0)' }],
          { duration: 420, easing: 'cubic-bezier(.22, 1, .36, 1)' }
        );
        return;
      }
      if (reducedMotion) {
        details.open = false;
        return;
      }
      closing = true;
      const animation = answer.animate(
        [{ height: `${answer.scrollHeight}px`, opacity: 1, transform: 'translateY(0)' }, { height: '0px', opacity: 0, transform: 'translateY(-6px)' }],
        { duration: 320, easing: 'cubic-bezier(.55, 0, 1, .45)' }
      );
      animation.onfinish = () => {
        details.open = false;
        closing = false;
      };
      animation.oncancel = () => {
        closing = false;
      };
    });
  });

  // 团队成员：桌面/平板为表格分页，移动端为横向轮播
  const memberListEl = document.querySelector('.team .member-list');
  const memberCardsAll = memberListEl ? [...memberListEl.querySelectorAll('.member-card')] : [];
  const memberControlsEl = document.querySelector('.member-controls');
  if (memberListEl && memberControlsEl && memberCardsAll.length > 1) {
    const memberCurrentEl = memberControlsEl.querySelector('[data-member-current]');
    const memberTotalEl = memberControlsEl.querySelector('[data-member-total]');
    const previousBtn = memberControlsEl.querySelector('[data-member-control="previous"]');
    const nextBtn = memberControlsEl.querySelector('[data-member-control="next"]');

    const getItemsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 720) return 1;
      if (width <= 980) return 2;
      return 3;
    };

    let activePage = 0;
    let activeMember = 0;
    let itemsPerPage = getItemsPerPage();
    let totalPages = Math.ceil(memberCardsAll.length / itemsPerPage);

    const isCarousel = () => window.innerWidth <= 720;

    const updateStatus = () => {
      if (isCarousel()) {
        if (memberCurrentEl) memberCurrentEl.textContent = String(activeMember + 1);
        if (memberTotalEl) memberTotalEl.textContent = String(memberCardsAll.length);
      } else {
        if (memberCurrentEl) memberCurrentEl.textContent = String(activePage + 1);
        if (memberTotalEl) memberTotalEl.textContent = String(totalPages);
      }
    };

    const updateButtons = () => {
      if (isCarousel()) {
        if (previousBtn) previousBtn.disabled = activeMember === 0;
        if (nextBtn) nextBtn.disabled = activeMember === memberCardsAll.length - 1;
      } else {
        if (previousBtn) previousBtn.disabled = activePage === 0;
        if (nextBtn) nextBtn.disabled = activePage === totalPages - 1;
      }
    };

    const applyGridPage = () => {
      memberCardsAll.forEach((card, index) => {
        const page = Math.floor(index / itemsPerPage);
        card.classList.toggle('is-hidden-page', page !== activePage);
      });
      memberListEl.scrollTo({ left: 0 });
    };

    const scrollToMember = index => {
      const card = memberCardsAll[index];
      if (!card) return;
      memberListEl.scrollTo({ left: card.offsetLeft - memberListEl.offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    const move = direction => {
      if (isCarousel()) {
        activeMember = Math.max(0, Math.min(memberCardsAll.length - 1, activeMember + direction));
        scrollToMember(activeMember);
      } else {
        activePage = Math.max(0, Math.min(totalPages - 1, activePage + direction));
        applyGridPage();
      }
      updateStatus();
      updateButtons();
    };

    previousBtn.addEventListener('click', () => move(-1));
    nextBtn.addEventListener('click', () => move(1));

    if (!reducedMotion && isCarousel()) {
      const onScroll = () => {
        const center = memberListEl.scrollLeft + memberListEl.clientWidth / 2;
        let nearest = 0;
        let nearestDistance = Infinity;
        memberCardsAll.forEach((card, index) => {
          const cardCenter = card.offsetLeft - memberListEl.offsetLeft + card.offsetWidth / 2;
          const dist = Math.abs(cardCenter - center);
          if (dist < nearestDistance) { nearestDistance = dist; nearest = index; }
        });
        activeMember = nearest;
        updateStatus();
        updateButtons();
      };
      memberListEl.addEventListener('scroll', onScroll, { passive: true });
    }

    window.addEventListener('resize', () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        totalPages = Math.ceil(memberCardsAll.length / itemsPerPage);
        activePage = Math.min(activePage, totalPages - 1);
      }
      if (isCarousel()) {
        scrollToMember(activeMember);
      } else {
        applyGridPage();
      }
      updateStatus();
      updateButtons();
    });

    if (isCarousel()) {
      scrollToMember(activeMember);
    } else {
      applyGridPage();
    }
    updateStatus();
    updateButtons();
  } else if (memberControlsEl) {
    memberControlsEl.hidden = true;
  }

  // 「开源社区」CTA 现为「核心成员与协作」板块内部的 .opensource-row，导航指向 #team
})();
