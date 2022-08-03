class DependencyInjection:
  def __init__(self, declarations):
    self.di_container = dict()
    for c in declarations:
      init_param = c.__init__.__annotations__
      correspond = {
        k: self.di_container[v]
        for k, v in init_param.items()
      }
      self.di_container[c] = c(**correspond)

class A:
  def __init__(self):
    self.iam = 'class A'
    self.di = None

class B:
  def __init__(self, cls_a: A):
    self.iam = 'class B'
    self.di = cls_a

class C:
  def __init__(self, cls_b: B):
    self.iam = 'class C'
    self.di = cls_b

class D:
  def __init__(self, cls_b: B, cls_c: C):
    self.iam = 'class D'
    self.di = [cls_b, cls_c]

di = DependencyInjection([A, B, C, D])
print(di.di_container)
for k, v in di.di_container.items():
  print(v.iam)
  print(v.di)
